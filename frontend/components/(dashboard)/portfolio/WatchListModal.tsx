'use client'

import React, { useCallback, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Input,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react'
import { InlineIcon } from '@iconify/react'
import { useUser } from '@/features/user/hooks/use-user'
import { stockSectors } from '@/components/(dashboard)/portfolio/constants'
import { IWatchlist, TSector } from '@/components/(dashboard)/portfolio/types'
import useWatchlist from '@/components/(dashboard)/portfolio/hooks/useWatchlist'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'

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
  const { user, openModalConvertUser, profile } = useUser()
  const {
    getWatchlists,
    watchlists,
    addWatchlist,
    removeWatchlist,
    updateWatchlist,
    loading,
  } = useWatchlist()

  const memoizedGetWatchlists = useCallback(() => {
    if (isOpen) {
      getWatchlists()
      findSymbols('A')
    }
  }, [isOpen, getWatchlists])

  const {
    getSymbols,
    symbols,
    addSymbol,
    deleteSymbol,
    error,
    all_symbols,
    findSymbols,
    loading: loadingSymbols,
    setError,
  } = useTickerStore()
  const [symbolName, setSymbolName] = React.useState<React.Key>('')
  const [watchListName, setWatchListName] = React.useState<string>('')
  const [isEditing, setIsEditing] = React.useState<number | null>(null)
  const [errorWatchlist, setErrorWatchlist] = React.useState<string | null>(
    null
  )
  const [selectedWatchlist, setSelectedWatchlist] =
    React.useState<IWatchlist | null>(watchlists[0] ?? null)
  const [symbolFind, setSymbol] = React.useState<string>('')

  useEffect(() => {
    memoizedGetWatchlists()
  }, [])

  const handleAddSymbol = async () => {
    setError('')
    if (!selectedWatchlist) return
    if (symbols.find((symbol) => symbol.symbol === symbolName))
      return setError('Symbol already added')
    if (!symbolName) return

    // todo: should add validation if ticker can be added

    await addSymbol(symbolName as string, selectedWatchlist.id)
    setSymbolName('')
    setSymbol('')
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

                  <Divider />
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
                          {item.name}
                        </p>

                        <div className="flex flex-row ">
                          <Button
                            className="bg-transparent"
                            isIconOnly
                            onPress={() => handleClickEdit(item.id, item.name)}
                          >
                            <InlineIcon
                              icon="iconamoon:edit-thin"
                              fontSize={20}
                            />
                          </Button>
                          <Divider
                            orientation="vertical"
                            className="border-1 bg-white"
                          />
                          <Button
                            className="bg-transparent"
                            isIconOnly
                            onPress={() => handleRemoveWatchlist(item.id)}
                          >
                            <InlineIcon
                              icon="iconamoon:trash-light"
                              fontSize={20}
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedWatchlist && (
                  <>
                    <Divider orientation="vertical" />
                    <div className="flex-1 flex flex-col gap-2">
                      <h4 className="flex flex-col gap-1 text-2xl">
                        {selectedWatchlist.name}
                      </h4>
                      <div className="flex gap-2 mt-auto flex-wrap md:flex-nowrap justify-center">
                        <Autocomplete
                          aria-label="symbol"
                          variant="bordered"
                          className="max-w-xs"
                          defaultItems={all_symbols}
                          isLoading={loadingSymbols}
                          selectedKey={symbolName as string}
                          // inputValue={symbol}
                          onChange={(symbol) => console.log(symbol)}
                          onSelectionChange={(key) => {
                            setSymbolName(key as string)
                          }}
                          onInputChange={(val) => {
                            setSymbol(val)
                            findSymbols(val)
                          }}
                          allowsCustomValue
                        >
                          {(item) => (
                            <AutocompleteItem
                              key={item.symbol}
                              textValue={item.symbol}
                            >
                              {item.symbol} : {item.name}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>

                        <Button
                          isDisabled={!symbolName}
                          onPress={handleAddSymbol}
                        >
                          Add
                        </Button>
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      <Divider />

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
                            <InlineIcon icon="mdi:close" fontSize={20} />
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
