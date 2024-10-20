import OneSignal from 'react-onesignal'

const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!

export const initializeOneSignal = async (uid: string) => {
  await OneSignal.init({
    appId: oneSignalAppId,
    notifyButton: {
      enable: true,
    },

    allowLocalhostAsSecureOrigin: true,
  })
  console.log('OneSignal initialized')

  await OneSignal.login(uid)
  await OneSignal.Notifications.requestPermission()
  await OneSignal.Slidedown.promptPush()
}
