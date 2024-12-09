import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

const supabaseUrl = 'https://sjjlctomjhlempmhcunl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqamxjdG9tamhsZW1wbWhjdW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNjY4OTksImV4cCI6MjA0Njg0Mjg5OX0.MhmK-JY5swNid1YXiG_9uGvHNELXYUzHbL_h1UnXWmk'

const options = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, options)