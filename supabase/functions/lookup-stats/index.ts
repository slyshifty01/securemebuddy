/// <reference lib="deno.ns" />

import { createClient } from "@supabase/supabase-js";

// --------------------------
// CORS
// --------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// --------------------------
// Types
// --------------------------
interface LookupLog {
  id: string;
  user_id: string;
  lookup_type: string;
  value: string;
  is_safe: boolean;
  created_at: string;
}

interface StatsRequest {
  user_id: string;
  range?: "7d" | "30d" | "all";
}

// --------------------------
// Supabase Admin Client
// --------------------------
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// --------------------------
// Handler
// --------------------------
Deno.serve(async (req) => {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as StatsRequest;
    const { user_id, range = "7d" } = body;

    if (!user_id) {
      return new Response(JSON.stringify({ error: "Missing user_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --------------------------
    // Date ranges
    // --------------------------
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const daysBack =
      range === "30d" ? 30 : range === "all" ? 3650 : 7;

    const startRange = new Date();
    startRange.setDate(now.getDate() - (daysBack - 1));

    // --------------------------
    // Fetch logs in range
    // --------------------------
    const { data: logs, error: logsError } = await supabase
      .from("lookup_logs")
      .select("*")
      .eq("user_id", user_id)
      .gte("created_at", startRange.toISOString());

    if (logsError) throw logsError;

    const typedLogs: LookupLog[] = logs ?? [];

    // Today / this month
    const todayLogs = typedLogs.filter(
      (log) => new Date(log.created_at) >= todayStart
    );
    const monthlyLogs = typedLogs.filter(
      (log) => new Date(log.created_at) >= monthStart
    );

    // Total logs for user (all time)
    const { data: totalLogsRaw, error: totalError } = await supabase
      .from("lookup_logs")
      .select("*")
      .eq("user_id", user_id);

    if (totalError) throw totalError;

    const totalLogs: LookupLog[] = totalLogsRaw ?? [];

    const safeCount = typedLogs.filter((l) => l.is_safe).length;
    const unsafeCount = typedLogs.filter((l) => !l.is_safe).length;

    // --------------------------
    // Time-series data by day
    // --------------------------
    const days: {
      date: string;
      safe: number;
      unsafe: number;
      total: number;
    }[] = [];

    for (let i = 0; i < daysBack; i++) {
      const d = new Date();
      d.setDate(now.getDate() - (daysBack - 1 - i));

      days.push({
        date: d.toISOString().split("T")[0],
        safe: 0,
        unsafe: 0,
        total: 0,
      });
    }

    for (const log of typedLogs) {
      const day = log.created_at.split("T")[0];
      const entry = days.find((d) => d.date === day);
      if (entry) {
        entry.total++;
        if (log.is_safe) entry.safe++;
        else entry.unsafe++;
      }
    }

    // --------------------------
    // Hourly activity
    // --------------------------
    const hourBins: Record<number, number> = {};
    for (let h = 0; h < 24; h++) hourBins[h] = 0;

    for (const log of typedLogs) {
      const hour = new Date(log.created_at).getHours();
      hourBins[hour]++;
    }

    const hourly = Object.keys(hourBins).map((h) => ({
      hour: `${h}:00`,
      count: hourBins[Number(h)],
    }));

    // --------------------------
    // Safety score
    // --------------------------
    const totalRelevant = safeCount + unsafeCount;
    const safetyScore =
      totalRelevant > 0
        ? Math.round((safeCount / totalRelevant) * 100)
        : 100;

    // --------------------------
    // Response
    // --------------------------
    return new Response(
      JSON.stringify({
        today_count: todayLogs.length,
        monthly_count: monthlyLogs.length,
        total_count: totalLogs.length,
        safe: safeCount,
        unsafe: unsafeCount,
        recent: typedLogs
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 10),
        series: days,
        hourly,
        safety_score: safetyScore,
        range_used: range,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
