import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/omdbApi';

export const useSearchMovies = (searchTerm: string) => {
  return useQuery({
    queryKey: ['movies', searchTerm],
    queryFn: () => searchMovies(searchTerm),
    enabled: !!searchTerm.trim(),
  });
};

