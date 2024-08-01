const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalSessionSupport: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      supabaseHost: new URL(process.env.SUPABASE_URL).host,
      supabaseURL: new URL(process.env.SUPABASE_URL).origin,
      email: process.env.LOGIN_EMAIL,
      password: process.env.LOGIN_PASSWORD,
    },
  },
});
