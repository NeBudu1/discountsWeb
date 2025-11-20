import React from 'react';
import { Deal } from '../types';
import { MapPin, ExternalLink, Tag } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  index: number;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, index }) => {
  // Deterministic pseudo-random image based on index and category
  // This ensures the image stays the same for the same card but changes per index
  const width = 600;
  const height = 400;
  const imageId = 10 + index; // Use picsum IDs
  
  // Fallback category keywords for specific UNSPLASH keywords if we wanted to use unsplash source
  // But sticking to picsum for simplicity as per requirements, or generic placeholder.
  // Let's use picsum with a seed to keep it consistent.
  const imageUrl = `https://picsum.photos/seed/${deal.id}/600/400`;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl} 
          alt={deal.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-700 shadow-sm flex items-center gap-1">
          <Tag size={12} />
          {deal.category.toUpperCase()}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-white">
          {deal.source}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-purple-600 transition-colors">
            {deal.title}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="truncate">{deal.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {deal.description}
        </p>
        
        <div className="pt-4 border-t border-gray-100 mt-auto">
          <a 
            href={deal.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 py-2.5 rounded-xl text-sm font-semibold transition-colors group-hover:ring-1 group-hover:ring-purple-200"
          >
            Подробнее
            <ExternalLink size={14} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};
