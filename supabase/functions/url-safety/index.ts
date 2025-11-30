import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Use POST" }), {
        status: 405,
      });
    }

    const { user_id, url } = await req.json();

    if (!user_id || !url) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or url" }),
        { status: 400 }
      );
    }

    const lower = url.toLowerCase();

    const is_safe =
      lower.startsWith("https://") &&
      !lower.includes("phishing") &&
      !lower.includes("steal") &&
      !lower.includes("malware") &&
      !lower.includes("free-gift");

    await supabase.from("lookup_logs").insert({
      user_id,
      type: "url",
      value: url,
      is_safe,
      created_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ url, is_safe }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
});
