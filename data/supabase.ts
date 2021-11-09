import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://jytuybwjrxjdkctjrcju.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM2MzczMDk0LCJleHAiOjE5NTE5NDkwOTR9.ww1aqDhkTsYbQp4Cdpf0B_MheOksCH_FDQDRsA_T9FI'
)