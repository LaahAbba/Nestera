// Stub wallet cache hook for MVP
export function useWalletCache() {
  return {
    getCachedBalance: () => null,
    setCachedBalance: () => { },
    clearCache: () => { },
  };
}

export function useWalletBalances(address?: string | null, network?: string | null, horizonUrl?: string | null) {
  return {
    data: [],
    isLoading: false,
    error: null,
    dataUpdatedAt: Date.now(),
    refetch: () => Promise.resolve(),
  };
}
