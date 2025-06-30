import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import type { IQLeaderboard, InsertIQLeaderboard } from '@shared/schema';

export const useLeaderboard = () => {
  const queryClient = useQueryClient();

  const { data: topScores = [], isLoading, error, refetch } = useQuery({
    queryKey: ['/api/leaderboard'],
    queryFn: async () => {
      try {
        return await apiRequest('/api/leaderboard') as Promise<IQLeaderboard[]>;
      } catch (err: any) {
        console.error('Leaderboard fetch error:', err);
        // Enhanced error classification
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          throw new Error('Network error - unable to reach leaderboard API');
        } else if (err.status === 500) {
          throw new Error('Server error - leaderboard temporarily unavailable');
        } else if (err.status === 404) {
          throw new Error('Leaderboard endpoint not found');
        } else if (err.status >= 400 && err.status < 500) {
          throw new Error('Leaderboard request failed - invalid parameters');
        } else {
          throw new Error('Failed to load leaderboard data');
        }
      }
    },
    retry: (failureCount, error) => {
      // Retry network errors up to 3 times
      if (error.message?.includes('Network error') && failureCount < 3) {
        return true;
      }
      // Don't retry client errors (4xx)
      if (error.message?.includes('request failed')) {
        return false;
      }
      // Retry server errors once
      return failureCount < 1;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000)
  });

  const addScoreMutation = useMutation({
    mutationFn: async (data: InsertIQLeaderboard) => {
      try {
        return await apiRequest('/api/leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (err: any) {
        console.error('Add score error:', err);
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          throw new Error('Network error - unable to submit score');
        } else if (err.status === 400) {
          throw new Error('Invalid score data - please check your input');
        } else if (err.status === 409) {
          throw new Error('Score already exists for this user');
        } else if (err.status === 500) {
          throw new Error('Server error - score submission failed');
        } else {
          throw new Error('Failed to submit score - please try again');
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/leaderboard'] });
    },
    retry: 2,
    retryDelay: 1000
  });

  const checkHighScore = async (score: number): Promise<boolean> => {
    try {
      const response = await apiRequest(`/api/leaderboard/check/${score}`) as { isHighScore: boolean };
      return response.isHighScore;
    } catch (error: any) {
      console.error('Failed to check high score:', error);
      
      // For high score checking, we'll be more conservative
      // and assume it's not a high score if we can't verify
      if (error.message?.includes('Network error')) {
        console.warn('Network error checking high score - assuming not high score');
      } else if (error.status >= 500) {
        console.warn('Server error checking high score - assuming not high score');
      }
      
      return false;
    }
  };

  const retry = () => {
    refetch();
  };

  return {
    topScores,
    isLoading,
    error,
    retry,
    addScore: addScoreMutation.mutate,
    isAddingScore: addScoreMutation.isPending,
    addScoreError: addScoreMutation.error,
    checkHighScore
  };
};