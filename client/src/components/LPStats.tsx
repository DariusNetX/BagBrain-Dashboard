import { useQuery } from '@tanstack/react-query';
import { LPStats as LPStatsType } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

const LPStats = () => {
  // Fetch LP stats data
  const { data: lpStats, isLoading } = useQuery<LPStatsType>({
    queryKey: ['/api/lpstats'],
    queryFn: () => apiRequest('/api/lpstats'),
  });

  if (isLoading) {
    return (
      <div className="border border-green-500 p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-green-500 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">💱 Liquidity Pool Stats</h2>
      <p className="mb-2">$BAG Reserve: {lpStats?.bagReserve?.toLocaleString() || '0'}</p>
      <p className="mb-2">$BLAZE Reserve: {lpStats?.blazeReserve?.toLocaleString() || '0'}</p>
      <p className="mb-2">Price: ${lpStats?.price?.toFixed(4) || '0.0000'}</p>
      
      {lpStats && (
        <div className="mt-4 pt-4 border-t border-green-500/30">
          <p className="text-sm text-gray-400">
            Last updated: {new Date(lpStats.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default LPStats;