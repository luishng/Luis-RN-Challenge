import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';
const DELETED_KEY = 'deleted';

type ArticleContextType = {
  favorites: string[];
  deleted: string[];
  isFavorited: (id: string) => boolean;
  isDeleted: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  deleteArticle: (id: string) => void;
};

const ArticleContext = createContext<ArticleContextType>({} as ArticleContextType);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<string[]>([]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    const fav = await AsyncStorage.getItem(FAVORITES_KEY);
    const del = await AsyncStorage.getItem(DELETED_KEY);
    setFavorites(fav ? JSON.parse(fav) : []);
    setDeleted(del ? JSON.parse(del) : []);
  };

  const toggleFavorite = async (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const deleteArticle = async (id: string) => {
    const updated = [...new Set([...deleted, id])];
    setDeleted(updated);
    await AsyncStorage.setItem(DELETED_KEY, JSON.stringify(updated));
  };

  const isFavorited = (id: string) => favorites.includes(id);
  const isDeleted = (id: string) => deleted.includes(id);
  
  return (
    <ArticleContext.Provider
      value={{
        favorites,
        deleted,
        isFavorited,
        isDeleted,
        toggleFavorite,
        deleteArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticleContext must be used within an ArticleProvider');
  }
  return context;
};
