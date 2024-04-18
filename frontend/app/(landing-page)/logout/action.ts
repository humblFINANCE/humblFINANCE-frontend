'use server'
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async (formData: FormData) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        console.log("no user logged in")
        redirect('/login')
    }
    const { error: signOutError } = await supabase.auth.signOut()
};
