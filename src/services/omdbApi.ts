import { apiKey, apiUrl } from '../config';
import { SearchResponse, DetailedResult } from '../types/search';

export const searchMovies = async (searchTerm: string): Promise<SearchResponse> => {
  const response = await fetch(
    `${apiUrl}?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data: SearchResponse = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error || 'No results found');
  }
  
  return data;
};

export const getMovieDetails = async (identifier: string): Promise<DetailedResult> => {
  const isImdbId = identifier.startsWith('tt');
  const queryParam = isImdbId ? `i=${identifier}` : `t=${encodeURIComponent(identifier)}`;
  
  const response = await fetch(
    `${apiUrl}?${queryParam}&apikey=${apiKey}&plot=full`
  );
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data: DetailedResult = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error || 'Movie not found');
  }
  
  return data;
};