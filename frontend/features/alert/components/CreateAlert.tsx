import { Button, Select, SelectItem } from '@nextui-org/react'
import React from 'react'

const DATA_STOCKS = [
  {
    key: 'AAPL',
    label: 'AAPL',
  },
  {
    key: 'MSFT',
    label: 'MSFT',
  },
  {
    key: 'AMZN',
    label: 'AMZN',
  },
]

function CreateAlert() {
  return (
    <div className="w-full h-full p-4">
      <form className="block">
        <div className="flex gap-4 flex-wrap">
          <Select label="Select Symbol" className="max-w-xs">
            {DATA_STOCKS.map((stock) => (
              <SelectItem key={stock.key}>{stock.label}</SelectItem>
            ))}
          </Select>
          <Select label="Select Condition" className="max-w-xs">
            {DATA_STOCKS.map((stock) => (
              <SelectItem key={stock.key}>{stock.label}</SelectItem>
            ))}
          </Select>
          <Select label="Select Logic" className="max-w-xs">
            {DATA_STOCKS.map((stock) => (
              <SelectItem key={stock.key}>{stock.label}</SelectItem>
            ))}
          </Select>
          <Select label="Select Value Type" className="max-w-xs">
            {DATA_STOCKS.map((stock) => (
              <SelectItem key={stock.key}>{stock.label}</SelectItem>
            ))}
          </Select>
          <Select label="Select Action" className="max-w-xs">
            {DATA_STOCKS.map((stock) => (
              <SelectItem key={stock.key}>{stock.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 w-full  bg-cyan-500 h-full">
          <Button color="secondary" size="lg">
            Add Alert
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateAlert
