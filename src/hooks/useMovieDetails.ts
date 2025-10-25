import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../services/omdbApi';

export const useMovieDetails = (identifier: string) => {
  return useQuery({
    queryKey: ['movie', identifier],
    queryFn: () => getMovieDetails(identifier),
    enabled: !!identifier,
  });
};