'use client'

import React from 'react'
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
import { stockSectors } from './constants'
import { InlineIcon } from '@iconify/react'
import { TSector } from './types'
import { useUser } from '@/features/user/hooks/use-user'

type WatchlistModalProps = {
  isOpen: boolean
  onOpen?: () => void
  onOpenChange: (open: boolean) => void
  watchlists: string[]
  setWatchlists: (arg: string[]) => void
}

export default function WatchListModal({
  isOpen,
  onOpenChange,
  onOpen,
  watchlists,
  setWatchlists,
}: WatchlistModalProps) {
  const { user, openModalConvertUser } = useUser()
  const [stockName, setStockName] = React.useState<string>('')
  const [watchListName, setWatchListName] = React.useState<string>('')
  const [isEditing, setIsEditing] = React.useState<number | null>(null)
  const [selectedWatchlist, setSelectedWatchlist] = React.useState<string>(
    watchlists[0] ?? ''
  )
  const [stocks, setStocks] = React.useState<
    { sector: string; stock: string }[]
  >([])
  const onAddWatchlist = (watchlist: string) => {
    setWatchlists([...watchlists, watchlist])
  }

  const handleSelectWatchlist = (watchlist: string) => {
    setSelectedWatchlist(watchlist)
  }
  const handleAddStock = () => {
    if (!selectedWatchlist) return
    // create validation if already added to the list
    if (stocks.find((stock) => stock.stock === stockName)) return
    if (!stockName) return

    setStocks([...stocks, { sector: selectedWatchlist, stock: stockName }])
    setStockName('')
  }

  const handleAddWatchlist = () => {
    if (user.is_anonymous) {
      openModalConvertUser()
      return
    }

    if (!watchListName) return
    if (watchlists.includes(watchListName)) return
    onAddWatchlist(watchListName)
    setWatchListName('')
  }

  //  function to remove stock from watchlist
  const handleRemoveStock = (stock: string) => {
    setStocks(stocks.filter((s) => s.stock !== stock))
  }

  const handleClickEdit = (watchlistIndex: number, watchlist: string) => {
    setIsEditing(watchlistIndex)
    setWatchListName(watchlist)
  }

  const handleEditWatchlist = () => {
    if (user.is_anonymous) {
      openModalConvertUser()
      return
    }

    if (!watchListName) return
    if (watchlists.includes(watchListName)) return

    const newWatchlists = [...watchlists]
    newWatchlists[isEditing as number] = watchListName
    console.log(newWatchlists)

    setWatchlists(newWatchlists)

    setIsEditing(null)
    setWatchListName('')
  }

  const handleRemoveWatchlist = (item: string) => {
    setWatchlists(watchlists.filter((wl) => wl !== item))
    if (selectedWatchlist === item) setSelectedWatchlist('')
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                        key={item}
                        className="flex justify-between items-center transition-all ease-in-out duration-300   dark:hover:bg-[#27272A] hover:bg-gray-300 px-2 rounded-md"
                      >
                        <p
                          className="bg-transparent w-full  text-xl cursor-pointer  "
                          onClick={() => setSelectedWatchlist(item)}
                        >
                          {item}
                        </p>

                        <div className="flex flex-row ">
                          <Button
                            className="bg-transparent"
                            isIconOnly
                            onPress={() => handleClickEdit(index, item)}
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
                            onPress={() => handleRemoveWatchlist(item)}
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
                        {selectedWatchlist}
                      </h4>
                      <div className="flex gap-2 mt-auto flex-wrap md:flex-nowrap justify-center">
                        <Input
                          onChange={(e) => setStockName(e.target.value)}
                          value={stockName}
                          placeholder="Add New Ticker"
                          aria-label="Stock Name"
                        />
                        <Button
                          isDisabled={!stockName}
                          onPress={handleAddStock}
                        >
                          Add
                        </Button>
                      </div>
                      <Divider />

                      {stocks
                        .filter((stock) => stock.sector === selectedWatchlist)
                        .map((stock) => (
                          <div
                            key={stock.stock}
                            className="flex justify-between items-center"
                          >
                            <p>{stock.stock}</p>
                            <Button
                              className="bg-transparent"
                              isIconOnly
                              onPress={() => handleRemoveStock(stock.stock)}
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
