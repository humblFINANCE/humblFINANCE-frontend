# Development: Getting Started

To start development, it is suggested that you use a virtual environment to manage the packages needed for the software development. You will need to install **Node.js**, which comes with **npm**, but I would recommend using a version manager like **pnpm**.

## Creating a Virtual Environment

To create a virtual environment using **micromamba** and ensure faster installs, you need to have both **nodejs** and **pnpm**. You can set this up with the following command:

```bash
micromamba create --prefix ./menv nodejs pnpm
micromamba activate --prefix ./menv
pnpm install
```

Now your development environment should be good to go!

# Development: Setting Up Supabase

Add a `.env.local` file to the root of the project with the following contents:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_FASTAPI_URL=
STRIPE_SECRET_KEY=
STRIPE_PAYMENT_DESCRIPTION=
STRIPE_WEBHOOK_SECRET=
```
