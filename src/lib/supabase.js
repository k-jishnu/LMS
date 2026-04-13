import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://PASTE_YOUR_URL_HERE.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'PASTE_YOUR_ANON_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseKey);
