'use server'
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
	const origin = headers().get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = createClient()

	const { data, error: checkUserError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/confirm`,
		},
	});

	if (checkUserError) {
		console.log('error heck user', checkUserError)
		return redirect("/login?message=could not authenticate user");
	}

	const userAlreadyRegistered = data.user && data.user.identities && data.user.identities.length === 0
	if (!userAlreadyRegistered) {
		//TODO: add emai confirmation page
		return redirect("/email-confirmation");
	}

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	})

	if (error) {
		console.log('error login', error)
		return redirect("/login?message=could not authenticate user");
	}

	return redirect("/dashboard/home");
};

export const signInWithGithub = async () => {
	const origin = headers().get("origin");
	const supabase = createClient();
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${origin}/auth/callback/github`
		}
	})

	if (error) {
		return redirect("/login?message=" + error.cause)
	}

	return redirect(data.url)
}

export const signUp = async (formData: FormData) => {
	const origin = headers().get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = createClient();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback/confirm`,
		},
	});

	if (error) {
		return redirect("/login?message=Could not authenticate user");
	}

	return redirect("/login?message=Check email to continue sign in process");
};

