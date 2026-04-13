import { cacheLife, cacheTag } from 'next/cache';

/**
 * Next.js 16+ Advanced Caching Patterns
 * Using the "use cache" directive at the function level.
 */

export async function getSecondsData() {
  'use cache';
  // Profile: seconds (Stale: 0, Revalidate: 1s, Expire: 60s)
  cacheLife('seconds');
  cacheTag('time-sensitive');

  return {
    timestamp: new Date().toLocaleTimeString(),
    type: 'Time-sensitive (1s)',
  };
}

export async function getMinutesData() {
  'use cache';
  // Profile: minutes (Stale: 5m, Revalidate: 1m, Expire: 1h)
  cacheLife('minutes');
  cacheTag('general-data');

  return {
    timestamp: new Date().toLocaleTimeString(),
    type: 'General (1m)',
  };
}

export async function getCustomCachedData() {
  'use cache';
  // Custom profile
  cacheLife({
    stale: 10,      // Consider stale after 10s
    revalidate: 30,  // Background refresh every 30s
    expire: 300,    // Hard expire after 5 mins
  });

  return {
    timestamp: new Date().toLocaleTimeString(),
    type: 'Custom (10s/30s)',
  };
}
