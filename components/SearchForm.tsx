import React, { useState } from 'react';
import { SearchParams } from '../types';
import { Search, MapPin, Filter } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('Москва');
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<SearchParams['platform']>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch({ city, query, platform });
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-8 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Найди лучшие скидки в твоем городе
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* City Input */}
            <div className="md:col-span-3 relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Где искать</label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Город"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800 font-medium"
                  required
                />
              </div>
            </div>

            {/* Query Input */}
            <div className="md:col-span-6 relative">
               <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Что искать</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Суши, спортзал, одежда..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Platform Select */}
            <div className="md:col-span-3 relative">
               <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Источник</label>
               <div className="relative group">
                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                 <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="all">Все источники</option>
                  <option value="instagram">Instagram</option>
                  <option value="yandex">Яндекс</option>
                  <option value="vk">ВКонтакте</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
               </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transform hover:scale-[1.01] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ищем скидки с ИИ...
              </span>
            ) : (
              "Найти предложения"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
