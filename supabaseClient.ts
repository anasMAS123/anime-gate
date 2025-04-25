// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!; // from your Supabase dashboard
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY!; // also from dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
