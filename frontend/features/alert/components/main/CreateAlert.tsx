import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
  Selection,
  Spacer,
} from '@nextui-org/react'
import { IAlertForm } from '@/features/alert/types/alert'
import { useEffect, useMemo, useState } from 'react'
import {
  useDataAction,
  useDataIndicator,
  useDataLogic,
  useDataSymbol,
} from '@/features/alert/hooks/useDataAlert'
import useCreateAlert from '@/features/alert/hooks/useFormAlert'
import { Controller } from 'react-hook-form'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'
import { formatNoUnderscore } from '@/utils/common/formatString'

function CreateAlert() {
  const { control, handleSubmit, onSubmit, watch } = useCreateAlert()
  const { all_symbols, findSymbols, loading: loadingSymbols } = useTickerStore()
  const { data: dataIndicator } = useDataIndicator()
  const { data: dataLogic } = useDataLogic()
  const { data: dataAction } = useDataAction()
  const formValues = watch()

  const [form, setForm] = useState({
    symbol: '',
    condition: '',
    logic: '',
    value: 0,
    action: '',
  } satisfies IAlertForm)

  const handleChange = (key: string, value: string) => {
    if (key === 'value') {
      if (value.toLocaleLowerCase() === 'current price') {
      } else if (value.toLocaleLowerCase() === 'yesterday close') {
      }

      return setForm({ ...form, value: +value })
    }

    setForm({ ...form, [key]: value })
  }

  const onError = (error: any) => {
    console.log(error)
  }

  useEffect(() => {
    findSymbols('A')
  }, [])

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-3xl ">Create New Alert</h2>
      <Spacer y={3} />
      <form className="mt-3">
        <div className="flex gap-4 flex-wrap">
          <Controller
            control={control}
            name="symbol_id"
            render={({ field }) => (
              <Autocomplete
                label="Select Symbol"
                className="max-w-xs"
                defaultItems={all_symbols}
                isLoading={loadingSymbols}
                selectedKey={field.value}
                // inputValue={symbol}
                onSelectionChange={(key) => {
                  field.onChange(key)
                }}
                onInputChange={(val) => {
                  findSymbols(val)
                }}
                allowsCustomValue
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.symbol_id}
                    textValue={item.symbol}
                  >
                    {item.symbol} : {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Controller
            control={control}
            name="indicator_id"
            render={({ field }) => (
              <Select
                label="Select Indicator"
                className="max-w-xs"
                disabledKeys={['']}
                {...field}
                selectedKeys={[field.value || '']}
              >
                {dataIndicator.length > 0 ? (
                  dataIndicator.map((indicator) => (
                    <SelectItem
                      key={indicator.indicator_id}
                      value={indicator.indicator_id}
                    >
                      {formatNoUnderscore(indicator.name)}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="">No Condition Available</SelectItem>
                )}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="logic_id"
            render={({ field }) => (
              <Select
                label="Select Logic"
                disabledKeys={['']}
                className="max-w-xs"
                {...field}
                selectedKeys={[field.value || '']}
              >
                {dataLogic.length > 0 ? (
                  dataLogic.map((logic) => (
                    <SelectItem key={logic.logic_id} value={logic.logic_id}>
                      {formatNoUnderscore(logic.condition)}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="">No Logic Available</SelectItem>
                )}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="value"
            render={({ field }) => (
              <Select
                label="Select Value"
                className="max-w-xs"
                {...field}
                selectedKeys={[field.value || '']}
              >
                {[
                  {
                    name: 'Current Price',
                    value: 'current_price',
                  },
                  {
                    name: 'Yesterday Close',
                    value: 'yesterday_close',
                  },
                ].map((value) => (
                  <SelectItem key={value.value} value={value.value}>
                    {value.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="action_id"
            render={({ field }) => (
              <Select
                label="Select Action"
                disabledKeys={['']}
                className="max-w-xs"
                {...field}
                value={field.value || ''}
                selectedKeys={[field.value || '']}
              >
                {dataAction.length > 0 ? (
                  dataAction.map((action) => (
                    <SelectItem key={action.action_id} value={action.action_id}>
                      {action.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="">No Action Available</SelectItem>
                )}
              </Select>
            )}
          />
        </div>
        <div className="mt-4 w-full bg-cyan-500 h-full">
          <Button
            color="secondary"
            size="lg"
            onClick={handleSubmit(onSubmit, onError)}
            isDisabled={Object.entries(formValues).some(
              (item) => item[1] === null || item[1] === undefined
            )}
          >
            Add Alert
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateAlert
