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

    const { user_id, email } = await req.json();

    if (!user_id || !email) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or email" }),
        { status: 400 }
      );
    }

    const lower = email.toLowerCase();

    const is_safe =
      !lower.includes("prince") &&
      !lower.includes("lottery") &&
      !lower.includes("bank transfer") &&
      !lower.includes("scam") &&
      !lower.includes("fraud");

    await supabase.from("lookup_logs").insert({
      user_id,
      type: "email",
      value: email,
      is_safe,
      created_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ email, is_safe }), {
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
