import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error(error);

      // Redirect back to the developer dashboard
      window.location.href = "/developer";
    };

    handleAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-xl">Authenticating...</p>
    </div>
  );
}
