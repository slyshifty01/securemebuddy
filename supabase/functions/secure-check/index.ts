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

    const { user_id, email, phone, url } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: "Missing user_id" }), {
        status: 400,
      });
    }

    const results: Record<string, boolean> = {};

    // Email check
    if (email) {
      const lower = email.toLowerCase();
      results.email =
        !lower.includes("prince") &&
        !lower.includes("lottery") &&
        !lower.includes("bank transfer") &&
        !lower.includes("scam") &&
        !lower.includes("fraud");
    }

    // Phone check
    if (phone) {
      const normalized = phone.replace(/[^0-9]/g, "");
      results.phone =
        normalized.length >= 10 &&
        !normalized.startsWith("900") &&
        !normalized.startsWith("976");
    }

    // URL check
    if (url) {
      const lower = url.toLowerCase();
      results.url =
        lower.startsWith("https://") &&
        !lower.includes("phishing") &&
        !lower.includes("steal") &&
        !lower.includes("malware") &&
        !lower.includes("free-gift");
    }

    // Overall result
    const overall_safe = Object.values(results).every(Boolean);

    // Log
    await supabase.from("lookup_logs").insert({
      user_id,
      type: "secure-check",
      value: JSON.stringify({ email, phone, url }),
      is_safe: overall_safe,
      created_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        ...results,
        overall_safe,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
});
