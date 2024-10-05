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

  await OneSignal.login(uid)
}
