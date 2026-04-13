'use client';

import { triggerRevalidatePath, triggerRevalidateTag, triggerUpdateTag } from '@/actions/revalidation';

export default function RevalidationButtons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8">
      <button
        onClick={() => triggerRevalidatePath('/revalidation-lab')}
        className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
      >
        Revalidate Path (Full)
      </button>
      
      <button
        onClick={() => triggerRevalidateTag('time-sensitive')}
        className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
      >
        Revalidate Tag (Stale)
      </button>

      <button
        onClick={() => triggerUpdateTag('general-data')}
        className="px-6 py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg active:scale-95"
      >
        Update Tag (Hard)
      </button>
    </div>
  );
}
