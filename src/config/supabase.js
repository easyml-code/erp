import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ifwpghkezgghjkcefqoe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmd3BnaGtlemdnaGprY2VmcW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1Mzc3OTMsImV4cCI6MjA2OTExMzc5M30.nf8fkP7GyMJ26vj3tOWtEdZ7_cEMrd_H6oicE1WYlxI'

// Note: Replace YOUR_ANON_KEY_HERE with your actual anon key from Supabase dashboard
// You can find it in: Project Settings > API > Project API keys > anon public

export const supabase = createClient(supabaseUrl, supabaseKey)