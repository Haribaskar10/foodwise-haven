
import { supabase } from '@/lib/supabase';

// A simple hook to access Supabase
export function useSupabase() {
  return { supabase };
}
