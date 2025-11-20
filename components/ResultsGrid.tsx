import React from 'react';
import { Deal } from '../types';
import { DealCard } from './DealCard';
import { SearchX } from 'lucide-react';

interface ResultsGridProps {
  results: Deal[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ results, isLoading, hasSearched }) => {
  if (isLoading) {
    // Skeleton loader
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden h-96 animate-pulse border border-gray-100">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-16 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchX className="text-gray-400" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ничего не найдено</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          К сожалению, мы не нашли актуальных скидок по вашему запросу. Попробуйте изменить ключевые слова или город.
        </p>
      </div>
    );
  }

  // If not searched yet, we render nothing (App handles Popular Categories)
  if (!hasSearched) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {results.map((deal, index) => (
        <DealCard key={deal.id} deal={deal} index={index} />
      ))}
    </div>
  );
};