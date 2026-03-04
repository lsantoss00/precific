"use server";

import { createServer } from "@/src/libs/supabase/server";
import { cookies } from "next/headers";

export async function newPassword({ password }: { password: string }) {
  const supabase = await createServer();
  const cookieStore = await cookies();

  const { error } = await supabase.auth.updateUser({ password });
  if (error)
    return {
      success: false,
      error: { code: error.code, message: error.message },
    };

  cookieStore.set("recovery_mode", "", { expires: new Date(0), path: "/" });
  cookieStore.set("invite_mode", "", { expires: new Date(0), path: "/" });
  await supabase.auth.signOut();

  return { success: true };
}
