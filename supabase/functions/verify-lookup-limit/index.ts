/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { createClient } from "@supabase/supabase-js";

// CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "content-type, apikey, authorization, x-client-info",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Edge Function entrypoint
Deno.serve(async (req: Request) => {
  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const { user_id, limit = 25 } = await req.json();

    // If no user_id passed, allow by default
    if (!user_id) {
      return new Response(
        JSON.stringify({ allowed: true, used: 0, limit }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Calculate the beginning of today
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Count today's lookups for this user
    const { data, error } = await supabase
      .from("lookup_logs")
      .select("id", { count: "exact" })
      .eq("user_id", user_id)
      .gte("created_at", startOfDay.toISOString());

    if (error) throw error;

    const used = data?.length ?? 0;

    // Return rate-limit result
    return new Response(
      JSON.stringify({
        allowed: used < limit,
        used,
        limit,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
