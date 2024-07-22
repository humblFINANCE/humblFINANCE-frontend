import { create } from 'zustand'

interface INotificationState {
  notifications: any[]
  loading: boolean
}

interface INotificationAction {
  getNotifications: () => void
}

export const useNotificationStore = create<
  INotificationState & INotificationAction
>((set) => ({
  notifications: [],
  loading: false,

  getNotifications: async () => {
    // set(() => ({ loading: true }))
  },
}))
