## v0.1.1 (2024-08-06)

### 🐛🚑️ Fixes

- **github-actions**: only bump version on master branch

## v0.1.0 (2024-08-06)

### ✨ Features

- **github-actions**: adding version bump flow
- adding loading spinner
- adding toast for theme change
- **icons**: replaced favicon / added HumblFinanceIcon svg
- **dashboard**: add notification dropdown and fix redirection
- **profile-setting**: add profile setting page
- **dashboard-header**: add user dropdown and theme switcher
- **login**: add otp input passwordless login
- **login**: linking account in passwordless
- **dashboard**: add modal upgrade tier and linking account
- **dashboard**: add utility to call convert user modal
- **user**: add user as react context
- **login**: add captcha in passwordless login
- **login**: anonymouse login impl and refactor login component
- **login**: add new modal login
- **pricing/page.tsx**: adding pricing template
- **portofolio-page**: adding WatchlistModal
- **portofolio-page**: adding table ag-grid
- **logout**: logout button working in logout modal
- **LogoutModal**: logout button in sidebar triggers LogoutMOdal
- **dashboard**: added a sidebar, static and not changing content
- **login**: basic login working || redirect to private page not working yet

### 🐛🚑️ Fixes

- remove unused code
- **user-table/route**: adding back  sntax
- fix portfolio error
- prevent overflowing component
- prevent overflowing component
- **npm**: audit fix
- **login**: using getURL from supabse guide
- **esling**: disable rules and implment typesafe selection
- **ESLint**: fixed  error by adding callback logic
- **login**: fix redirect social login
- **login**: fix redirect social login
- **IWatchlist**: removed field that isnt in Interface
- **pages**: added placeholder pages
- **import**: removed duplicate import
- **dependency**: fix missing dependency ESLint in
- **remove**: removed  from public.watchlist_symbols
- **AvatarURL updated to match avatur URl from **: using supabase AvatarURll for avatar image in dashboard header
- **ESLint**: fixed exhaustive dependencies
- **DashboardHeader**: clean URL path now showing on dashboard header
- **login**: defualt `remember selected` and text fixes
- **login**: forgot password
- **CustomCard.tsx**: fix bug after merge
- **user-dropdown**: ensure logout modal can be called from user dropdown
- **forgot-password**: hide captcha after succes submit
- **login**: add forgot password button
- **login**: fix import useRouter
- **login**: hide sign in button after complete passwordless
- **login**: hide captcha after succesfully passwordless login
- **login**: redirect path when linking account
- **FeatureComparisonsComponent.tsx**: add function to return null before mounted
- **docker**: add  to  file
- **nextui**: changed tailwind config to global import
- **landing**: ensure landing footer as client component
- **login**: captcha on verify animation get stuttered
- **login/action.ts**: fixed email redirect link
- **github-login**: route to `dashboard/home`
- **dashboard-UI**: made container fit within the full window height
- **dashboard**: highlighting active sidebar tab
- **login**: made login background contianer fill the screen
- **login**: redirection to other route group

### ♻️  Refactorings

- **login**: refactor structure code
- **login**: refactor structure code
- **login**: using absolute import instead of relative import
- **login**: refactor filename to pascal case
- **login**: share action and state between modal and form login
- **login**: refactor login feature to avoid duplicate component and function
- **nextui**: fix import in nextui component using eslint
- **nextui**: import all nextui component from global

### chore

- :package: add zustand
- :package: update version of react stripe
- :package: stripe package

### docs

- revert the docs
- install command changes

### feat

- **watchlist-modal**: add back set default
- **dashboard-home**: Dashboard Seetup
- **dashboard-home**: Add Tranding View
- **portofolio**: button improvement
- **dashboard-home**: Add Tranding View
- **dashboard-home**: Add Tranding View
- user table cache
- setcookie when empty or outdated
- add api route for user-table
- **user-table**: Add Refresh
- **user-table**: Functionality Update
- **user-table**: Functionality Update
- **user-table**: Functionality Update
- **user-table**: Functionality Update
- **responsivity**: Mobile Friendly Features
- **responsivity**: Mobile Friendly Features
- :sparkles: autocomplete symbol selector
- **responsivity**: Mobile Friendly Features
- **profile-settings**: page changes
- **profile-settings**: page changes
- **profile-settings**: page changes
- **profile-settings**: page changes
- **profile-settings**: page changes
- :recycle: done portofolio integration
- watchlist
- crud watchlist
- setup live data
- adding supabase functionalities
- :lipstick: adding create alert page
- :sparkles: scaffold alerts feature
- **auth**: add reset password
- **login**: Login with twitter and discord
- **login**: Login with google
- **login**: Login with twitter and discord
- **login**: Login with google
- **login**: implement login with github

### fix

- **set-default**: add back set default
- **dashboard-home**: component render
- fix loading table
- fix user table
- fix refresh limit logic
- fix input symbol
- fix unwanted fetch
- remove new url code
- fix un updated code
- fix logic
- refresh limit issue is done
- fix outdated code
- fix portfolio
- **responsivity**: Mobile Friendly Features
- :bug: fix fetching user table
- :bug: fix fetching user table
- **responsivity**: Mobile Friendly Features
- **responsivity**: Mobile Friendly Features
- **responsivity**: Mobile Friendly Features
- add admin to tiers
- **profile-settings**: page changes
- **profile-settings**: page changes
- **profile-settings**: page changes
- :bug: fix redirect to login
- :bug: fix portofolio bug
- :bug: fix unloaded data
- navigation button and login page crash
- navigation button and login page crash
- :recycle: pricing page

### refactor

- :recycle: loading table spinner
- adjustment
- refresh_limit functionalities after subscribe
- adjust modal upgrade
- **landing-page**: Mobile Friendly Features
- **landing-page**: Mobile Friendly Features
- :recycle: pricing page refactor
- :recycle: pricing page refactor
- layouting alert page

### style

- **login**: Change layout social login button
- **login**: add button & modal login with magic link and phone
- **login**: Change layout social login button
- **login**: add button & modal login with magic link and phone

### ✅🤡🧪 Tests

- move intercept to top
- add wait time
- adapt the test to the latest changes
- dashboard portfolio e2e test
- dashboard home e2e test
- authentication e2e test
- root e2e test

### 🎨🏗️ Style & Architecture

- format the latest update from development branch >>> ⏰ 15m
- setup prettier and format all code >>> ⏰ 20m
- **login**: add spinner in submit button
- **login**: fix catpcha overflow
- **login**: use different bg style between modal and login page
- **eslint**: setup eslint
- setup prettier & format all code >>> ⏰ 10m

### 💄🚸 UI & UIX

- **ThemeSwitcher/index.tsx**: new ui for switch button theme
- **PricingPageComponent.tsx**: flow and logic for stripe payment
- **AskAuthModal.tsx**: adding  modal ask to login
- **PricingPage.tsx**: update  ui and some functional
- **ModalCheckout.tsx-FormCheckout.tsx**: setting up UI for subscription
- **LandingPageNavbar.tsx**: adding check active function
- **WatchListModal**: fix spacing betwwen button
- **WatchListModal**: hover bg
- **watchlistmodal**: fixing divider and some styles
- **WatchList-Modal**: adding new component : watchlist modal
- **user-table**: compatible with theme switcher
- **portofolio-table**: curve edge, horizontal scroll smaller vp

### 💚👷 CI & Build

- **docker**: dockerize next app

### 📌➕⬇️ ➖⬆️  Dependencies

- adding cypress and dotenv
- **update**: pnpm update
- **update**: pnpm update
- **pnpm**: update to new version
- **nextui**: added induvidual modal library
- **nextui**: accordion, select, listbox
- **nextui**: added chip
- **dashboard**: useHooks-ts used to set max phone width
- **nextui**: spacer / scroll-shadow
- **nextui**: tooltip lib
- **add**: nextui-checkbox
- **backend**: supabase
- **backend**: supabase
- **nextui-pro**: iconify & tailwind-merge
- **update**: major dep update

### 🔐🚧📈✏️ 💩👽️🍻💬🥚🌱🚩🥅🩺 Others

- **login**: make login form as dedicated component
- **nextui**: reinstall next ui and try basic usage

### 🚚🍱 Resources & Assets

- **add pages**: macro, alerts, data-laboratory
- **rename**: LogoutButton --> LogoutMOdalButton
- **cursor**: file for cursor context
- **add**: nextui collapsible sidebar
- **move**: moved dashboard components
- **confirmation**: moved  into  dir
- **remove**: old login page
- **rename**: login page --> LoginPage
- **add**: new login page style
- **rename**: landing-page, using small-case for route groups
- **move**: routing `LandingPage` and `Dashboard` organization
- **dashboard**: yout.tsx file
- **add**: nextUI Pro || BrandIcons
- **add**: frontend
- **add**: frontend direcotry, accidentally `git init` in frontend/ dir
- **add**: adding and setting up resources for supabase connection
- testing

### 🧹 chore

- remove unused function
- **env**: remove file
- adding element id for test
- Add sample env variables for e2e tests
- add redirect for dashboard
- remove console.log() of URLSearchParams
- **pricing-page**: small feature refactor
- **pricing-page**: updated subscription prices
- **QOL**: small UI changes
- remove debug logging
- **sidebar**: removed teams section for now
- **delete**: old static data file
- **mimic order of tabs on landing page navbar**: mimic
- formatting
- **login**: remove console.log
