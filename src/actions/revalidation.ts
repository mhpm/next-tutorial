'use server';

import { revalidatePath, revalidateTag, updateTag } from 'next/cache';

/**
 * Next.js 16+ Revalidation Actions
 */

export async function triggerRevalidatePath(path: string) {
  console.log(`--- [Action] Revalidating path: ${path}`);
  // Purges the entire page/layout cache
  revalidatePath(path);
}

export async function triggerRevalidateTag(tag: string) {
  console.log(`--- [Action] Revalidating tag: ${tag}`);
  /**
   * revalidateTag: 
   * Marks as stale. Triggers background fetch on next request.
   * NOTE: In Next.js 16, a second 'profile' argument is required.
   */
  revalidateTag(tag, 'max');
}

export async function triggerUpdateTag(tag: string) {
  console.log(`--- [Action] Updating (hard invalidating) tag: ${tag}`);
  /**
   * updateTag:
   * NEW in Next.js 16.
   * Hard invalidates and forces a fresh render in the current request.
   */
  updateTag(tag);
}
