import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    "https://kztusjtvdmyslpoycgad.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dHVzanR2ZG15c2xwb3ljZ2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwODgxOTUsImV4cCI6MTk3OTY2NDE5NX0.sFG6MZKotICJXpDY2IAEaQsuWuOjso4K9l5LVSe-Mm0"
)