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

type WatchlistModalProps = {
  isOpen: boolean
  onOpen?: () => void
  onOpenChange: (open: boolean) => void // Add this line
}

export default function WatchList({
  isOpen,
  onOpenChange,
  onOpen,
}: WatchlistModalProps) {
  const [stockName, setStockName] = React.useState<string>('')
  const [selectedWatchlist, setSelectedWatchlist] = React.useState<TSector>(
    stockSectors[0]
  )
  const [stocks, setStocks] = React.useState<
    { sector: string; stock: string }[]
  >([])

  const handleSelectWatchlist = (watchlist: TSector) => {
    setSelectedWatchlist(watchlist)
  }
  const handleAddStock = () => {
    if (!selectedWatchlist) return
    // create validation if already added to the list
    if (stocks.find((stock) => stock.stock === stockName)) return
    if (!stockName) return

    setStocks([
      ...stocks,
      { sector: selectedWatchlist.value, stock: stockName },
    ])
    setStockName('')
  }

  //  function to remove stock from watchlist
  const handleRemoveStock = (stock: string) => {
    setStocks(stocks.filter((s) => s.stock !== stock))
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <div className="flex">
              <div className="flex-1">
                <ModalHeader className="flex flex-col gap-1">
                  Watchlists
                </ModalHeader>
                <ModalBody>
                  {stockSectors.map((sector) => (
                    <Button
                      className="bg-transparent"
                      key={sector.value}
                      onClick={() => setSelectedWatchlist(sector)}
                    >
                      {sector.label} Stocks
                    </Button>
                  ))}
                </ModalBody>
              </div>
              <Divider orientation="vertical" className="border-divider" />
              <div className="flex-1">
                <ModalHeader className="flex flex-col gap-1">
                  {selectedWatchlist.label} Stocks
                </ModalHeader>
                <ModalBody className="flex flex-col h-max">
                  {stocks
                    .filter((stock) => stock.sector === selectedWatchlist.value)
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
                  <div className="flex gap-2 mt-auto flex-wrap md:flex-nowrap justify-center">
                    <Input
                      onChange={(e) => setStockName(e.target.value)}
                      value={stockName}
                      placeholder="Add New Ticker"
                      aria-label="Stock Name"
                    />
                    <Button isDisabled={!stockName} onPress={handleAddStock}>
                      Add
                    </Button>
                  </div>
                </ModalBody>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
