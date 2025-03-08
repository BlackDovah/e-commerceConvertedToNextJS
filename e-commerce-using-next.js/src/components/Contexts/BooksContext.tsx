'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ProductCardProps } from '@/types/types';
import { fetchBooks } from '@/services/api';
import { useTranslation } from 'react-i18next';

type BooksContextType = {
  books: ProductCardProps | null;
  isLoading: boolean;
  error: string | null;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<ProductCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBooks(i18n.language);
        setBooks(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred while fetching books');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [i18n.language]);
  
  

  return (
    <BooksContext.Provider value={{ books, isLoading, error }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
}
