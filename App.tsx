import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ResultsGrid } from './components/ResultsGrid';
import { SearchParams, Deal, SearchState } from './types';
import { searchDeals } from './services/geminiService';
import { Sparkles, Search, Tag, Utensils, Dumbbell, Shirt, Ticket } from 'lucide-react';

// Popular categories configuration
const POPULAR_CATEGORIES = [
  { 
    id: 'food', 
    name: 'Еда и Рестораны', 
    query: 'скидки в ресторанах суши пицца', 
    icon: <Utensils size={32} className="text-orange-500" />,
    desc: 'Вкусные предложения рядом'
  },
  { 
    id: 'sport', 
    name: 'Спорт и Фитнес', 
    query: 'акции в фитнес клубах абонемент', 
    icon: <Dumbbell size={32} className="text-blue-500" />,
    desc: 'Спортзалы и секции'
  },
  { 
    id: 'fashion', 
    name: 'Одежда и Обувь', 
    query: 'распродажа одежды и обуви', 
    icon: <Shirt size={32} className="text-pink-500" />,
    desc: 'Тренды по лучшим ценам'
  },
  { 
    id: 'fun', 
    name: 'Развлечения', 
    query: 'скидки в кино и парки развлечений', 
    icon: <Ticket size={32} className="text-purple-500" />,
    desc: 'Кино, парки, квесты'
  },
];

function App() {
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    results: [],
    hasSearched: false,
  });

  const handleSearch = async (params: SearchParams) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, hasSearched: true }));
    
    try {
      const deals = await searchDeals(params);
      setState({
        isLoading: false,
        error: null,
        results: deals,
        hasSearched: true
      });
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.message || "An error occurred",
        results: [],
        hasSearched: true
      });
    }
  };

  const handleCategoryClick = (query: string) => {
    // Trigger search with default city (Moscow) or prompt user
    // Ideally we would pre-fill the form, but direct search is faster for UX here
    handleSearch({ city: 'Москва', query, platform: 'all' });
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />

      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 h-[340px] w-full flex flex-col items-center justify-center text-center px-4 pb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
          Найди <span className="text-yellow-300">Скидки</span> и <span className="text-yellow-300">Бонусы</span> рядом
        </h1>
        <p className="text-purple-100 text-lg max-w-2xl leading-relaxed">
          Искусственный интеллект сканирует соцсети и агрегаторы, чтобы найти для вас лучшие предложения в городе.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full pb-16">
        <SearchForm onSearch={handleSearch} isLoading={state.isLoading} />

        {state.error && (
          <div className="max-w-4xl mx-auto px-4 mt-8">
             <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center">
              {state.error}
            </div>
          </div>
        )}

        {/* How it works Section (ID for navigation) */}
        <section id="features" className="py-16 bg-white border-y border-gray-100 mt-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Как это работает?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Мы используем передовые технологии Gemini AI для поиска актуальных предложений в реальном времени.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-purple-600">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">1. Выберите что искать</h3>
                <p className="text-gray-600">Введите название товара, услуги или места, и укажите ваш город.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-pink-600">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">2. Умный поиск AI</h3>
                <p className="text-gray-600">Наш алгоритм сканирует Instagram, Яндекс и другие площадки в поисках свежих постов.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-orange-50 hover:bg-orange-100 transition-colors">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-orange-600">
                  <Tag size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">3. Получите скидки</h3>
                <p className="text-gray-600">Выбирайте лучшие предложения, переходите к источнику и экономьте!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular / Results Section (ID for navigation) */}
        <section id="popular" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {state.hasSearched ? "Результаты поиска" : "Популярные категории"}
            </h2>
            {state.hasSearched && (
               <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                 Найдено: {state.results.length}
               </span>
            )}
          </div>

          {state.hasSearched ? (
            <ResultsGrid 
              results={state.results} 
              isLoading={state.isLoading} 
              hasSearched={state.hasSearched} 
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {POPULAR_CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.query)}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all text-left group"
                >
                  <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.desc}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PromoHunter AI. Работает на базе Google Gemini.</p>
          <p className="mt-2">Мы используем AI для поиска общедоступной информации. Проверяйте актуальность акций у продавца.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;