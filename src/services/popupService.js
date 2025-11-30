import { supabase } from "../lib/supabaseClient.js";

export async function hasDismissedPopup(userId, popupName) {
  const { data, error } = await supabase
    .from("popup_events")
    .select("*")
    .eq("user_id", userId)
    .eq("popup_name", popupName)
    .eq("dismissed", true)
    .maybeSingle();

  if (error) {
    console.error("Supabase popup check error:", error);
  }

  return { data, error };
}

export async function recordPopupDismissal(userId, popupName) {
  const { data, error } = await supabase.from("popup_events").insert({
    user_id: userId,
    popup_name: popupName,
    dismissed: true,
  });

  if (error) {
    console.error("Supabase popup insert error:", error);
  }

  return { data, error };
}
