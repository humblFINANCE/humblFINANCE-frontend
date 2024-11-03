import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react'
import React, { useState } from 'react'
import useCreateAlert from '@/features/alert/hooks/useFormAlert'
import {
  useDataAction,
  useDataIndicator,
  useDataLogic,
  useDataSymbol,
} from '@/features/alert/hooks/useDataAlert'
import { IAlertForm } from '@/features/alert/types/alert'
import { Controller } from 'react-hook-form'
import VALUE_TYPE from '@/features/alert/constants/VALUE_TYPE'
import { formatNoUnderscore } from '@/utils/common/formatString'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'

interface Props {
  onOpenChange: () => void
  isOpen: boolean
  data: any
}

const ModalDetail: React.FC<Props> = ({ isOpen, onOpenChange, data }) => {
  const { control, handleSubmit, onUpdate, watch, reset } = useCreateAlert(
    data.alert_id,
    onOpenChange
  )
  const { all_symbols, findSymbols, loading: loadingSymbols } = useTickerStore()

  const { data: dataSymbol } = useDataSymbol()
  const { data: dataIndicator } = useDataIndicator()
  const { data: dataLogic } = useDataLogic()
  const { data: dataAction } = useDataAction()
  const [isEdit, setIsEdit] = useState(false)

  const formValues = watch()

  React.useEffect(() => {
    if (data.symbol_id) {
      reset({
        indicator_id: data.indicator_id,
        action_id: data.alert_actions[0].actions.action_id,
        logic_id: data.logic_id,
        symbol_id: data.symbol_id,
        value: data.value,
        alert_type: data.alert_type,
      })

      findSymbols(data.all_symbols.symbol)
    }
  }, [data])

  console.log('FROM MODAL DETAIL', data)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange()
        reset()
        setIsEdit(false)
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Detail Alert
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4 flex-col items-center">
                <Controller
                  control={control}
                  name="alert_type"
                  render={({ field }) => (
                    <Select
                      label="Alert Type"
                      className="max-w-xs"
                      {...field}
                      isDisabled={!isEdit}
                      selectedKeys={[field.value]}
                    >
                      {['BUY', 'SELL'].map((indicator) => (
                        <SelectItem key={indicator} value={indicator}>
                          {indicator}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="symbol_id"
                  render={({ field }) => (
                    <Autocomplete
                      isDisabled={!isEdit}
                      label="Select Symbol"
                      className="max-w-xs"
                      defaultItems={all_symbols}
                      isLoading={loadingSymbols}
                      // inputValue={symbol}
                      onSelectionChange={(key) => {
                        field.onChange(key)
                      }}
                      onInputChange={(val) => {
                        findSymbols(val)
                      }}
                      selectedKey={field.value?.toString()}
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
                      isDisabled={!isEdit}
                      label="Select Indicator"
                      className="max-w-xs"
                      {...field}
                      disabledKeys={[
                        dataIndicator
                          .find((item) => item.name === watch('value'))
                          ?.indicator_id?.toString() || '',
                      ]}
                      selectedKeys={[field.value?.toString() || '']}
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
                      isDisabled={!isEdit}
                      label="Select Logic"
                      disabledKeys={['']}
                      className="max-w-xs"
                      {...field}
                      selectedKeys={[field.value?.toString() || '']}
                    >
                      {dataLogic.length > 0 ? (
                        dataLogic.map((logic) => (
                          <SelectItem
                            key={logic.logic_id}
                            value={logic.logic_id}
                          >
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
                      isDisabled={!isEdit}
                      label="Select Value"
                      className="max-w-xs"
                      {...field}
                      disabledKeys={[
                        dataIndicator.filter(
                          (i) => i.indicator_id === +watch('indicator_id')
                        )[0]?.name || '',
                      ]}
                      selectedKeys={[field.value?.toString() || '']}
                    >
                      {dataIndicator.length > 0 ? (
                        dataIndicator.map((indicator) => (
                          <SelectItem
                            key={indicator.name}
                            value={indicator.name}
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
                  name="action_id"
                  render={({ field }) => (
                    <Select
                      isDisabled={!isEdit}
                      label="Select Action"
                      disabledKeys={['']}
                      className="max-w-xs"
                      {...field}
                      selectedKeys={[field.value?.toString() || '']}
                    >
                      {dataAction.length > 0 ? (
                        dataAction.map((action) => (
                          <SelectItem
                            key={action.action_id}
                            value={action.action_id}
                          >
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
              {isEdit ? (
                <div
                  className="mt-4 w-full  h-full flex gap-4 justify-center"
                  style={{}}
                >
                  <Button
                    color="secondary"
                    size="lg"
                    onClick={handleSubmit(onUpdate)}
                    isDisabled={Object.entries(formValues).some(
                      (item) => item[1] === null || item[1] === undefined
                    )}
                  >
                    Save
                  </Button>
                  <Button
                    color="danger"
                    size="lg"
                    onClick={() => {
                      setIsEdit(false)
                      reset({
                        indicator_id: data.indicator_id,
                        action_id: data.alert_actions[0].actions.action_id,
                        logic_id: data.logic_id,
                        symbol_id: data.symbol_id,
                        value: data.value,
                        alert_type: data.alert_type,
                      })

                      findSymbols(data.all_symbols.symbol)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mt-4 w-full justify-center flex h-full">
                  <Button
                    color="secondary"
                    size="lg"
                    onClick={() => setIsEdit(true)}
                  >
                    Update
                  </Button>
                </div>
              )}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalDetail
