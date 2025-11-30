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

    const { user_id, phone } = await req.json();

    if (!user_id || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or phone" }),
        { status: 400 }
      );
    }

    const normalized = phone.replace(/[^0-9]/g, "");

    const is_safe =
      normalized.length >= 10 &&
      !normalized.startsWith("900") &&
      !normalized.startsWith("976");

    await supabase.from("lookup_logs").insert({
      user_id,
      type: "phone",
      value: phone,
      is_safe,
      created_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ phone, is_safe }), {
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
