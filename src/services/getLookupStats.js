const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Fetch lookup stats for a given user over a range.
 *
 * @param {string} userId - The user's anonymous SMB ID.
 * @param {"7d" | "30d" | "all"} range - Time range for stats.
 */
export async function getLookupStats(userId, range = "7d") {
  if (!SUPABASE_URL) {
    throw new Error("Missing VITE_SUPABASE_URL env variable.");
  }

  if (!userId) {
    throw new Error("Missing userId for getLookupStats.");
  }

 const endpoint = `${SUPABASE_URL}/functions/v1/lookup-stats`;


  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, range }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Ignore JSON parse errors; will use generic message below
  }

  if (!res.ok) {
    const err = new Error(
      data?.error || `Failed to load stats (status ${res.status})`
    );
    // OverviewPage checks err.status
    err.status = res.status;
    throw err;
  }

  return data;
}
