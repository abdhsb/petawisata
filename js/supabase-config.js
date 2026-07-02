// Supabase Configuration
const SUPABASE_URL = 'https://wbsholnhnymiidbnhngw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indic2hvbG5obnltaWlkYm5obmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMTM0MDAsImV4cCI6MjA5ODU4OTQwMH0.BYIA3cFfKJpTqY54f6RJrkZ-yQ9aq220DgxJgQqKQY4';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
