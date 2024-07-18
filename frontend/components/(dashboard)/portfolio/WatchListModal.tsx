'use client'

import React, {useCallback, useEffect} from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    CircularProgress,
    Divider,
    Input, Tooltip, Chip,
} from '@nextui-org/react'
import {InlineIcon} from '@iconify/react'
import {useUser} from '@/features/user/hooks/use-user'
import {stockSectors} from '@/components/(dashboard)/portfolio/constants'
import {IWatchlist, TSector} from '@/components/(dashboard)/portfolio/types'
import useWatchlist from '@/components/(dashboard)/portfolio/hooks/useWatchlist'
import {useTickerStore} from '@/components/(dashboard)/portfolio/hooks/useTickerStore'

type WatchlistModalProps = {
    isOpen: boolean
    onOpen?: () => void
    onOpenChange: (open: boolean) => void
}

const isLimited = (membership: string, totalWatchlists: number) => {
    if (membership === 'peon' && totalWatchlists >= 2) {
        return true
    }

    if (membership === 'premium' && totalWatchlists >= 5) {
        return true
    }

    if (membership === 'power' && totalWatchlists >= 10) {
        return true
    }

    return false
}

export default function WatchListModal({
                                           isOpen,
                                           onOpenChange,
                                           onOpen,
                                       }: WatchlistModalProps) {
    const [isMounted, setIsMounted] = React.useState(false)
    const {user, openModalConvertUser, profile} = useUser()
    const {
        getWatchlists,
        watchlists,
        addWatchlist,
        removeWatchlist,
        updateWatchlist,
        updateDefaultWatchlist,
        loading,
    } = useWatchlist()

    const memoizedGetWatchlists = useCallback(() => {
        if (isOpen) {
            getWatchlists()
        }
    }, [isOpen, getWatchlists])

    const {getSymbols, symbols, addSymbol, deleteSymbol, error} =
        useTickerStore()
    const [symbolName, setSymbolName] = React.useState<string>('')
    const [watchListName, setWatchListName] = React.useState<string>('')
    const [isEditing, setIsEditing] = React.useState<number | null>(null)
    const [errorWatchlist, setErrorWatchlist] = React.useState<string | null>(
        null
    )
    const [selectedWatchlist, setSelectedWatchlist] =
        React.useState<IWatchlist | null>(watchlists[0] ?? null)
    const [symbols1, setSymbols] = React.useState<
        { sector: string; symbol: string }[]
    >([])

    useEffect(() => {
        memoizedGetWatchlists()
    }, [memoizedGetWatchlists])

    const onAddWatchlist = (watchlist: string) => {
    }

    const handleAddSymbol = async () => {
        if (!selectedWatchlist) return
        if (symbols.find((symbol) => symbol.symbol === symbolName)) return
        if (!symbolName) return

        // todo: should add validation if ticker can be added

        await addSymbol(symbolName, selectedWatchlist.id)
        setSymbolName('')
    }

    const handleAddWatchlist = async () => {
        setErrorWatchlist(null)
        if (user.is_anonymous) {
            openModalConvertUser()
            return
        }

        if (!watchListName) return
        if (watchlists.find((wl) => wl.name === watchListName)) {
            setErrorWatchlist('Watchlist already exists')
            return
        }
        if (isLimited(profile?.membership!, watchlists.length)) {
            setErrorWatchlist('Watchlist limit reached')
            return
        }

        // check have default in profile table
        // await checkDefaultWatchlists(watchListName)

        await addWatchlist(watchListName)

        setWatchListName('')
    }

    //  function to remove symbol1 from watchlist
    const handleRemoveStock = (id: number) => {
        if (!selectedWatchlist) return
        deleteSymbol(id, selectedWatchlist?.id)
    }

    const handleClickEdit = (watchlist_id: number, watchlist: string) => {
        setIsEditing(watchlist_id)
        setWatchListName(watchlist)
    }

    const handleEditWatchlist = async () => {
        if (user.is_anonymous) {
            openModalConvertUser()
            return
        }

        if (!watchListName) return
        if (watchlists.find((wl) => wl.name === watchListName)) return
        if (isEditing) {
            await updateWatchlist(isEditing, watchListName)
        }

        setIsEditing(null)
        setWatchListName('')
        setSelectedWatchlist(null)
    }

    const handleRemoveWatchlist = async (id: number) => {
        await removeWatchlist(id)
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={() => {
                    setWatchListName('')
                    setIsEditing(null)
                    setSelectedWatchlist(null)
                    onOpenChange(false)
                    setErrorWatchlist(null)
                }}
                backdrop='blur'
                isDismissable={false}
                size="4xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <ModalBody>
                            <div className="flex  items-start p-4 gap-3 h-[25rem]">
                                <div className="flex-1 flex flex-col gap-2">
                                    <h4 className="flex flex-col gap-1 text-2xl">
                                        My Watchlists
                                    </h4>
                                    <div className="flex gap-2 flex-wrap md:flex-nowrap justify-center">
                                        <Input
                                            onChange={(e) => setWatchListName(e.target.value)}
                                            value={watchListName}
                                            isDisabled={loading}
                                            placeholder="Add New Watchlist"
                                            aria-label="watchlist-name"
                                        />
                                        <Button
                                            isDisabled={!watchListName || loading}
                                            isLoading={loading}
                                            onPress={
                                                isEditing !== null
                                                    ? handleEditWatchlist
                                                    : handleAddWatchlist
                                            }
                                        >
                                            {isEditing !== null ? 'Save' : 'Add'}
                                        </Button>
                                    </div>
                                    {errorWatchlist && (
                                        <p className="text-red-500 text-sm">{errorWatchlist}</p>
                                    )}

                                    <Divider/>
                                    <div className="w-full h-full overflow-auto">
                                        {watchlists.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-center transition-all ease-in-out duration-300   dark:hover:bg-[#27272A] hover:bg-gray-300 px-2 rounded-md"
                                            >
                                                <p
                                                    className="bg-transparent w-full  text-xl cursor-pointer  "
                                                    onClick={async () => {
                                                        setSelectedWatchlist(item)
                                                        await getSymbols(item.id)
                                                    }}
                                                >
                                                    {item.name} {item.is_default ? <Chip
                                                    endContent={<InlineIcon
                                                        icon="material-symbols-light:check"
                                                        fontSize={20}
                                                    />}
                                                    className='ml-1'
                                                    variant="flat"
                                                    size="sm"
                                                    color="primary"
                                                >
                                                    Default
                                                </Chip> : null}
                                                </p>

                                                <div className="flex flex-row ">
                                                    {
                                                        !item.is_default ?
                                                            <Tooltip
                                                                key={`primary`} color={`primary`}
                                                                content={`Set as Default`}>
                                                                <Button
                                                                    className="bg-transparent"
                                                                    isIconOnly
                                                                    isDisabled={loading}
                                                                    onPress={() => updateDefaultWatchlist(item.id, true)}
                                                                >
                                                                    {
                                                                        loading ? null :
                                                                            <InlineIcon
                                                                                icon="material-symbols-light:check"
                                                                                fontSize={20}
                                                                                color="blue"
                                                                            />
                                                                    }
                                                                </Button>
                                                            </Tooltip> : null
                                                    }

                                                    <Tooltip
                                                        key={`default`} color={`default`}
                                                        content={`Edit`}>
                                                        <Button
                                                            className="bg-transparent"
                                                            isIconOnly
                                                            isDisabled={loading}
                                                            onPress={() => handleClickEdit(item.id, item.name)}
                                                        >
                                                            {
                                                                loading ? null :
                                                                    <InlineIcon
                                                                        icon="iconamoon:edit-thin"
                                                                        fontSize={20}
                                                                        color="yellow"
                                                                    />
                                                            }
                                                        </Button>
                                                    </Tooltip>
                                                    <Divider
                                                        orientation="vertical"
                                                        className="border-1 bg-white"
                                                    />
                                                    <Tooltip
                                                        key={`danger`} color={`danger`}
                                                        content={`Delete`}>
                                                        <Button
                                                            className="bg-transparent"
                                                            isIconOnly
                                                            isDisabled={loading}
                                                            onPress={() => handleRemoveWatchlist(item.id)}
                                                        >
                                                            {
                                                                loading ? <CircularProgress size="sm"
                                                                                            aria-label="Loading..."/> :
                                                                    <InlineIcon
                                                                        icon="iconamoon:trash-light"
                                                                        fontSize={20}
                                                                        color="red"
                                                                    />
                                                            }
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {selectedWatchlist && (
                                    <>
                                        <Divider orientation="vertical"/>
                                        <div className="flex-1 flex flex-col gap-2">
                                            <h4 className="flex flex-col gap-1 text-2xl">
                                                {selectedWatchlist.name}
                                            </h4>
                                            <div className="flex gap-2 mt-auto flex-wrap md:flex-nowrap justify-center">
                                                <Input
                                                    onChange={(e) =>
                                                        setSymbolName(e.target.value.toUpperCase())
                                                    }
                                                    value={symbolName}
                                                    placeholder="Add New Ticker"
                                                    aria-label="Stock Name"
                                                    maxLength={10}
                                                />
                                                <Button
                                                    isDisabled={!symbolName}
                                                    onPress={handleAddSymbol}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                            {error && <p className="text-red-500 text-sm">{error}</p>}

                                            <Divider/>

                                            {symbols.map((symbol1) => (
                                                <div
                                                    key={symbol1.id}
                                                    className="flex justify-between items-center"
                                                >
                                                    <p>{symbol1.symbol}</p>
                                                    <Button
                                                        className="bg-transparent"
                                                        isIconOnly
                                                        onPress={() => handleRemoveStock(symbol1.id)}
                                                    >
                                                        <InlineIcon icon="mdi:close" fontSize={20}/>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
