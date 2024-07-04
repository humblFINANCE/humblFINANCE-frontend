import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
  Selection,
  Spacer,
} from '@nextui-org/react'
import { IAlertForm } from '../types/alert'
import { useState } from 'react'
import {
  useDataAction,
  useDataIndicator,
  useDataLogic,
  useDataSymbol,
} from '../hooks/useDataAlert'
import VALUE_TYPE from '../constants/VALUE_TYPE'

function CreateAlert() {
  const { dataSymbol, error: errorSymbol } = useDataSymbol()
  const { dataIndicator, error: errorIndicator } = useDataIndicator()
  const { dataLogic, error: errorLogic } = useDataLogic()
  const { dataAction, error: errorAction } = useDataAction()

  const [form, setForm] = useState({
    symbol: '',
    condition: '',
    logic: '',
    value: 0,
    action: '',
  } satisfies IAlertForm)

  const handleChange = (key: string, value: string) => {
    console.log(key, value)

    if (key === 'value') {
      if (value.toLocaleLowerCase() === 'current price') {
      } else if (value.toLocaleLowerCase() === 'yesterday close') {
      }

      return setForm({ ...form, value: +value })
    }

    setForm({ ...form, [key]: value })
  }

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-3xl ">Create New Alert</h2>
      <Spacer y={3} />
      <form className="mt-3">
        <div className="flex gap-4 flex-wrap">
          <Select
            label="Select Symbol"
            className="max-w-xs"
            disabledKeys={['']}
            value={form.symbol}
            onChange={(value) => handleChange('symbol', value.target.value)}
          >
            {dataSymbol.length > 0 ? (
              dataSymbol.map((symbol) => (
                <SelectItem key={symbol.symbol_id} value={symbol.symbol_id}>
                  {symbol.symbol}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="">No Symbols Available</SelectItem>
            )}
          </Select>
          <Select label="Select Condition" className="max-w-xs">
            {dataIndicator.map((indicator) => (
              <SelectItem
                key={indicator.indicator_id}
                value={indicator.indicator_id}
              >
                {indicator.name}
              </SelectItem>
            ))}
          </Select>
          <Select label="Select Logic" className="max-w-xs">
            {dataLogic.map((logic) => (
              <SelectItem key={logic.logic_id} value={logic.logic_id}>
                {logic.condition}
              </SelectItem>
            ))}
          </Select>
          <Autocomplete
            allowsCustomValue
            label="Select Value Type"
            className="max-w-xs"
            defaultItems={VALUE_TYPE}
            onInputChange={(value) => handleChange('value', value)}
          >
            {(value) => (
              <AutocompleteItem key={value.key}>{value.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Select label="Select Action" className="max-w-xs">
            {dataAction.map((action) => (
              <SelectItem key={action.action_id} value={action.action_id}>
                {action.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 w-full  bg-cyan-500 h-full">
          <Button
            color="secondary"
            size="lg"
            isDisabled={Object.entries(form).some((item) => item[1] === '')}
          >
            Add Alert
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateAlert
