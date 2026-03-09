"use server";

import { createServer } from "@/src/libs/supabase/server";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const supabase = await createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: { code: error.code, message: error.message },
    };
  }

  return { success: true };
}
