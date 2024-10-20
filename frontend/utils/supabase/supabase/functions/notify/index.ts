// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import * as OneSignal from 'https://esm.sh/@onesignal/node-onesignal@1.0.0-beta7'

const _OnesignalAppId_ = Deno.env.get('ONESIGNAL_APP_ID')!
const _OnesignalUserAuthKey_ = Deno.env.get('USER_AUTH_KEY')!
const _OnesignalRestApiKey_ = Deno.env.get('ONESIGNAL_REST_API_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
    })
  }
  try {
    const body = await req.text()

    console.log(_OnesignalAppId_, _OnesignalUserAuthKey_, _OnesignalRestApiKey_)

    const { message, user_id, title, type } = JSON.parse(body)

    if (type === 'PUSH') {
      // Build OneSignal notification object
      const res = await fetch('https://api.onesignal.com/notifications', {
        body: JSON.stringify({
          app_id: _OnesignalAppId_,
          contents: {
            en: message,
          },
          headings: {
            en: title,
          },
          target_channel: 'push',
          include_external_user_ids: [user_id],
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + _OnesignalRestApiKey_,
        },
      })

      const response = await res.json()
      console.log(response)

      return new Response(
        // JSON.stringify({ onesignalResponse: 'success' }),
        JSON.stringify({ onesignalResponse: response }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'authorization, x-client-info, apikey, content-type',
          },
        }
      )
    }
  } catch (err) {
    console.error('Failed to create OneSignal notification', err)
    return new Response('Server error.', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/notify' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
