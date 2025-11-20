import { GoogleGenAI } from "@google/genai";
import { Deal, SearchParams } from "../types";

export const searchDeals = async (params: SearchParams): Promise<Deal[]> => {
  const { city, query, platform } = params;

  // Initialize the client inside the function to ensure process.env is ready
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let platformPrompt = "";
  if (platform === 'instagram') platformPrompt = "Focus on finding results from Instagram mentions or aggregators.";
  else if (platform === 'yandex') platformPrompt = "Focus on Yandex Maps, Yandex Market, or Russian aggregators.";
  else if (platform === 'vk') platformPrompt = "Focus on VKontakte communities and public pages.";

  // We cannot use responseSchema with googleSearch, so we use a strict formatting prompt
  // to parse the text response manually.
  const prompt = `
    Find currently active discounts, bonuses, sales, or special offers for "${query}" in the city of "${city}".
    ${platformPrompt}
    
    Please find at least 6 distinct offers.
    
    CRITICAL OUTPUT FORMAT:
    You must output the data strictly as a list where each item is separated by the string "%%%ITEM%%%".
    Inside each item, separate the fields with the string "|||".
    The fields must be in this order:
    Title ||| Description (short, max 20 words) ||| Location/Store Name ||| Source Name (e.g. Instagram, Website)
    
    Do not include any markdown formatting like **bold** or lists. Just the raw text with separators.
    Do not include an intro or outro.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseSchema is NOT allowed with googleSearch
        // responseMimeType is NOT allowed with googleSearch
      },
    });

    const text = response.text || "";
    
    // Extract grounding chunks (URLs) to try and match them to our results
    // In a real complex app, we would do more sophisticated matching. 
    // Here we will try to assign the most relevant link from metadata if available, 
    // otherwise rely on the text description or generic search.
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const links = groundingChunks
      .map(chunk => chunk.web?.uri || "")
      .filter(uri => uri !== "");

    // Parse the custom format
    const items = text.split("%%%ITEM%%%").map(item => item.trim()).filter(item => item.length > 0);

    const deals: Deal[] = items.map((item, index) => {
      const parts = item.split("|||");
      const title = parts[0]?.trim() || "Unknown Offer";
      const description = parts[1]?.trim() || "No description available.";
      const location = parts[2]?.trim() || city;
      const source = parts[3]?.trim() || "Web";

      // Assign a link from grounding chunks round-robin style if we have them, 
      // simply to ensure every card has a valid "Read More" destination 
      // (Since Gemini text output doesn't perfectly map 1:1 to chunks in raw text mode easily)
      const sourceUrl = links[index % links.length] || `https://www.google.com/search?q=${encodeURIComponent(title + " " + city)}`;

      // Determine a category for image generation logic later
      let category = 'general';
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('sushi') || lowerTitle.includes('pizza') || lowerTitle.includes('food') || lowerTitle.includes('cafe')) category = 'food';
      else if (lowerTitle.includes('gym') || lowerTitle.includes('fitness') || lowerTitle.includes('sport')) category = 'sports';
      else if (lowerTitle.includes('clothes') || lowerTitle.includes('fashion') || lowerTitle.includes('shoes')) category = 'fashion';
      else if (lowerTitle.includes('tech') || lowerTitle.includes('phone')) category = 'technology';

      return {
        id: `deal-${index}-${Date.now()}`,
        title,
        description,
        location,
        source,
        sourceUrl,
        category
      };
    });

    return deals;

  } catch (error) {
    console.error("Error searching deals:", error);
    throw new Error("Failed to fetch deals. Please try again.");
  }
};