import { createClient } from "@supabase/supabase-js";

// Create a custom Supabase client that injects the Clerk session token into the request headers
export function createClerkSupabaseClient(session) {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_KEY!,
    {
      async accessToken() {
        return session?.getToken() ?? null;
      },
    }
  );
}
