import { supabase } from '../lib/supabase';

async function checkCols() {
  const { data, error } = await supabase.from('courses').select('*').limit(1);
  if (data) console.log('Columns:', Object.keys(data[0]));
}
checkCols();
