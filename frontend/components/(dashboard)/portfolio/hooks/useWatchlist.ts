import {createClient} from '@/utils/supabase/client'
import {create} from 'zustand'
import {TABLES} from '@/components/(dashboard)/portfolio/constants'
import {
    IWatchlistAction,
    IWatchlistState,
} from '@/components/(dashboard)/portfolio/types'
import {useTickerStore} from '@/components/(dashboard)/portfolio/hooks/useTickerStore'

const useWatchlist = create<IWatchlistState & IWatchlistAction>((set, get) => ({
    watchlists: [],
    loading: false,
    getWatchlists: async () => {
        const supabase = createClient()
        const user = await supabase.auth.getUser()

        const {data, error} = await supabase
            .from(TABLES.WATCHLIST)
            .select(
                `id,
        user_id,
        name,
        is_default,
        created_at,
        watchlist_symbols(id, watchlist_id, symbol)`
            )
            .eq('user_id', user.data.user?.id)
            .order('id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            set(() => ({watchlists: data}))
        }
    },

    addWatchlist: async (watchlist: string) => {
        set(() => ({loading: true}))
        const supabase = createClient()
        const user = await supabase.auth.getUser()
        let {data: profiles, error}: any = await supabase
            .from('profiles')
            .select()
            .eq('id', user.data.user?.id)
            .select('default_watchlist')

        // console.log("profiles: ", profiles)

        // check profile table if  default_watchlist exist
        if (profiles[0]?.default_watchlist === null) {
            const {data: insertWatchlistRes, error} = await supabase.from(TABLES.WATCHLIST).insert({
                name: watchlist,
                is_default: true,
                user_id: user.data.user?.id,
                created_at: new Date(),
            }).select()

            const {data: insertProfileRes, error: aerrorRes}: any = await supabase
                .from('profiles')
                .update({default_watchlist: watchlist})
                .eq('id', user.data.user?.id)
                .select()

            if (error || aerrorRes) {
                console.log(error, aerrorRes)
                set(() => ({loading: false}))
                return
            }
            await get().getWatchlists()
            set(() => ({loading: false}))
        } else {
            const {error} = await supabase.from(TABLES.WATCHLIST).insert({
                name: watchlist,
                is_default: false,
                user_id: user.data.user?.id,
                created_at: new Date(),
            })

            if (error) {
                console.log(error)
                set(() => ({loading: false}))
                return
            }
            await get().getWatchlists()
            set(() => ({loading: false}))
        }
    },

    removeWatchlist: async (watchlistId: number) => {
        set(() => ({loading: true}))
        const supabase = createClient()
        const user = await supabase.auth.getUser()

        const {error: deleteSymbolError} = await supabase
            .from(TABLES.WATCHLIST_SYMBOLS)
            .delete()
            .eq('watchlist_id', watchlistId)

        if (deleteSymbolError) {
            console.log(deleteSymbolError)
            return
        }

        const {error} = await supabase
            .from(TABLES.WATCHLIST)
            .delete()
            .eq('id', watchlistId)
            .eq('user_id', user.data.user?.id)

        if (error) {
            console.log(error)
            return
        }

        const {data: insertRes, error: aerrorRes}: any = await supabase
            .from('profiles')
            .update({default_watchlist: null})
            .eq('id', user.data.user?.id)
            .select()

        if (aerrorRes) {
            console.log(aerrorRes)
            return
        }

        await useTickerStore.getState().getSymbols(watchlistId)
        await get().getWatchlists()
        set(() => ({loading: false}))
    },

    updateWatchlist: async (id: number, name: string) => {
        set(() => ({loading: true}))
        const supabase = createClient()
        const user = await supabase.auth.getUser()

        const {data, error}: any = await supabase
            .from(TABLES.WATCHLIST)
            .update({name: name})
            .eq('id', id)
            .eq('user_id', user.data.user?.id)
            .select()

        if (data[0].is_default) {
            const {data: profile, error: aerrorProfile}: any = await supabase
                .from('profiles')
                .update({default_watchlist: name})
                .eq('id', user.data.user?.id)
                .select()


            // console.log("data: ", data, profile)
        }


        if (error) {
            console.log(error)
            return
        }

        await get().getWatchlists()
        set(() => ({loading: false}))
    },

    updateDefaultWatchlist: async (id: number, is_default: boolean) => {
        set(() => ({loading: true}))
        const supabase = createClient()
        const user = await supabase.auth.getUser()

        const {data: watchlist, error: errorwatchlist}: any = await supabase
            .from(TABLES.WATCHLIST)
            .update({is_default: false})
            .eq('is_default', true)
            .eq('user_id', user.data.user?.id)
            .select()

        const {data: watchlist2nd, error: errorwatchlist2nd}: any = await supabase
            .from(TABLES.WATCHLIST)
            .update({is_default: is_default})
            .eq('id', id)
            .eq('user_id', user.data.user?.id)
            .select()

        const {data: profile, error: aerrorProfile}: any = await supabase
            .from('profiles')
            .update({default_watchlist: watchlist2nd[0]?.name})
            .eq('id', user.data.user?.id)
            .select()

        // console.log("watchlist: ", watchlist, watchlist2nd, profile)

        if (errorwatchlist || errorwatchlist2nd || aerrorProfile) {
            console.log(errorwatchlist, errorwatchlist2nd, aerrorProfile)
            return
        }

        await get().getWatchlists()
        set(() => ({loading: false}))
    },
}))

export default useWatchlist
