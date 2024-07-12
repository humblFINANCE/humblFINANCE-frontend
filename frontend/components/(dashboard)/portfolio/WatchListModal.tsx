'use client'

import React, { useEffect } from 'react'
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

export default function WatchListModal({
  isOpen,
  onOpenChange,
  onOpen,
}: WatchlistModalProps) {
  const [isMounted, setIsMounted] = React.useState(false)
  const { user, openModalConvertUser } = useUser()
  const {
    getWatchlists,
    watchlists,
    addWatchlist,
    removeWatchlist,
    updateWatchlist,
  } = useWatchlist()
  const { getTickers, tickers, addTicker, deleteTicker, error } =
    useTickerStore()
  const [stockName, setStockName] = React.useState<string>('')
  const [watchListName, setWatchListName] = React.useState<string>('')
  const [isEditing, setIsEditing] = React.useState<number | null>(null)
  const [selectedWatchlist, setSelectedWatchlist] =
    React.useState<IWatchlist | null>(watchlists[0] ?? null)
  const [stocks, setStocks] = React.useState<
    { sector: string; stock: string }[]
  >([])

  useEffect(() => {
    getWatchlists()
  }, [isOpen])

  const onAddWatchlist = (watchlist: string) => {}

  const handleAddStock = async () => {
    if (!selectedWatchlist) return
    if (stocks.find((stock) => stock.stock === stockName)) return
    if (!stockName) return

    // todo: should add validation if ticker can be added

    await addTicker(stockName, selectedWatchlist.watchlist_id)
    setStockName('')
  }

  const handleAddWatchlist = async () => {
    if (user.is_anonymous) {
      openModalConvertUser()
      return
    }

    if (!watchListName) return
    if (watchlists.find((wl) => wl.name === watchListName)) return
    await addWatchlist(watchListName)
    setWatchListName('')
  }

  //  function to remove stock from watchlist
  const handleRemoveStock = (ticker_id: number) => {
    if (!selectedWatchlist) return
    deleteTicker(ticker_id, selectedWatchlist?.watchlist_id)
  }

  const handleClickEdit = (watchlist_id: number, watchlist: string) => {
    setIsEditing(watchlist_id)
    setWatchListName(watchlist)
  }

  const handleEditWatchlist = async () => {
    console.log(user)

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
        }}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className="flex  items-start p-4 gap-3 h-[25rem]">
                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="flex flex-col gap-1 text-2xl">Watchlist</h4>
                  <div className="flex gap-2 flex-wrap md:flex-nowrap justify-center">
                    <Input
                      onChange={(e) => setWatchListName(e.target.value)}
                      value={watchListName}
                      placeholder="Add New Watchlist"
                      aria-label="watchlist Name"
                    />
                    <Button
                      isDisabled={!watchListName}
                      onPress={
                        isEditing !== null
                          ? handleEditWatchlist
                          : handleAddWatchlist
                      }
                    >
                      {isEditing !== null ? 'Save' : 'Add'}
                    </Button>
                  </div>
                  <Divider />
                  <div className="w-full h-full overflow-auto">
                    {watchlists.map((item, index) => (
                      <div
                        key={item.watchlist_id}
                        className="flex justify-between items-center transition-all ease-in-out duration-300   dark:hover:bg-[#27272A] hover:bg-gray-300 px-2 rounded-md"
                      >
                        <p
                          className="bg-transparent w-full  text-xl cursor-pointer  "
                          onClick={async () => {
                            setSelectedWatchlist(item)
                            await getTickers(item.watchlist_id)
                          }}
                        >
                          {item.name}
                        </p>

                        <div className="flex flex-row ">
                          <Button
                            className="bg-transparent"
                            isIconOnly
                            onPress={() =>
                              handleClickEdit(item.watchlist_id, item.name)
                            }
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
                            onPress={() =>
                              handleRemoveWatchlist(item.watchlist_id)
                            }
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
                        <Input
                          onChange={(e) =>
                            setStockName(e.target.value.toUpperCase())
                          }
                          value={stockName}
                          placeholder="Add New Ticker"
                          aria-label="Stock Name"
                          maxLength={10}
                        />
                        <Button
                          isDisabled={!stockName}
                          onPress={handleAddStock}
                        >
                          Add
                        </Button>
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      <Divider />

                      {tickers.map((stock) => (
                        <div
                          key={stock.ticker_id}
                          className="flex justify-between items-center"
                        >
                          <p>{stock.ticker_symbol}</p>
                          <Button
                            className="bg-transparent"
                            isIconOnly
                            onPress={() => handleRemoveStock(stock.ticker_id)}
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
