// src/services/lookup.js
import { supabase } from "../lib/supabaseClient.js";

/**
 * Optional daily lookup limiter (frontend safety check)
 * Returns true if user is within limit, false if exceeded.
 */
export async function checkLimit(userId) {
  if (!userId) return true;

  const { data, error } = await supabase
    .from("lookup_logs")
    .select("id", { count: "exact" })
    .eq("user_id", userId)
    .gte("created_at", new Date().toISOString().slice(0, 10)); // today's date

  if (error) {
    console.error("checkLimit error:", error);
    return true; // fail-safe: allow
  }

  const count = data?.length || 0;
  const LIMIT = 50; // you can change this

  return count < LIMIT;
}

/**
 * Log a lookup event
 */
export async function logLookup(type, input, userId = "dev-user") {
  const { error } = await supabase.from("lookup_logs").insert({
    lookup_type: type,
    input_value: input,
    user_id: userId,
  });

  if (error) console.error("logLookup error:", error);
}

/**
 * Example validators (replace with real ones later)
 */
export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePhone(phone) {
  return /^[0-9\-\(\)\s]+$/.test(phone);
}

export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
