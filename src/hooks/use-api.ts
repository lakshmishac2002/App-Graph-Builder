import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../mocks/api';

export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: mockApi.getApps,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGraph = (appId: string | null) => {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => {
      if (!appId) throw new Error('No app selected');
      return mockApi.getGraph(appId);
    },
    enabled: !!appId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
