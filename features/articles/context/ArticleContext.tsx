import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  getFavorites,
  setFavorites,
  getDeleted,
  setDeleted,
} from '../storage/articleStorage';

type ArticleContextType = {
  favorites: string[];
  deleted: string[];
  isFavorited: (id: string) => boolean;
  isDeleted: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  deleteArticle: (id: string) => void;
  restoreArticle: (id: string) => void;
};

const ArticleContext = createContext<ArticleContextType>({} as ArticleContextType);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavoritesState] = useState<string[]>([]);
  const [deleted, setDeletedState] = useState<string[]>([]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    const fav = await getFavorites();
    const del = await getDeleted();
    setFavoritesState(fav);
    setDeletedState(del);
  };

  const toggleFavorite = async (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavoritesState(updated);
    await setFavorites(updated);
  };

  const deleteArticle = async (id: string) => {
    const updated = [...new Set([...deleted, id])];
    setDeletedState(updated);
    await setDeleted(updated);
  };

  const restoreArticle = async (id: string) => {
    const updated = deleted.filter((item) => item !== id);
    setDeletedState(updated);
    await setDeleted(updated);
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
        restoreArticle,
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
