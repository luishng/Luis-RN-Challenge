import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../model/article';

const FAVORITES_KEY = 'favorites';
const DELETED_KEY = 'deleted';
const CACHE_KEY = 'articles_cache';

export async function getFavorites(): Promise<string[]> {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function setFavorites(favorites: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function getDeleted(): Promise<string[]> {
  const data = await AsyncStorage.getItem(DELETED_KEY);
  return data ? JSON.parse(data) : [];
}

export async function setDeleted(deleted: string[]): Promise<void> {
  await AsyncStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
}

export async function cacheArticles(articles: Article[]): Promise<void> {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(articles));
}

export async function getCachedArticles(): Promise<Article[] | null> {
  const data = await AsyncStorage.getItem(CACHE_KEY);
  return data ? JSON.parse(data) : null;
}