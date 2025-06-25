import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import type { IQLeaderboard, InsertIQLeaderboard } from '../../shared/schema';

export const useLeaderboard = () => {
  const queryClient = useQueryClient();

  const { data: topScores = [], isLoading, error } = useQuery({
    queryKey: ['/api/leaderboard'],
    queryFn: () => apiRequest('/api/leaderboard') as Promise<IQLeaderboard[]>
  });

  const addScoreMutation = useMutation({
    mutationFn: (data: InsertIQLeaderboard) => 
      apiRequest('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/leaderboard'] });
    }
  });

  const checkHighScore = async (score: number): Promise<boolean> => {
    try {
      const response = await apiRequest(`/api/leaderboard/check/${score}`) as { isHighScore: boolean };
      return response.isHighScore;
    } catch (error) {
      console.error('Failed to check high score:', error);
      return false;
    }
  };

  return {
    topScores,
    isLoading,
    error,
    addScore: addScoreMutation.mutate,
    isAddingScore: addScoreMutation.isPending,
    checkHighScore
  };
};