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

  const { data: dataSymbol } = useDataSymbol()
  const { data: dataIndicator } = useDataIndicator()
  const { data: dataLogic } = useDataLogic()
  const { data: dataAction } = useDataAction()
  const [isEdit, setIsEdit] = useState(false)

  const formValues = watch()

  const [form, setForm] = useState({
    symbol: '',
    condition: '',
    logic: '',
    value: 0,
    action: '',
    alert_type: '',
  } satisfies IAlertForm)

  React.useEffect(() => {
    if (data.symbol_id) {
      reset({
        indicator_id: data.indicator_id,
        action_id: data.alert_actions[0].actions.action_id,
        logic_id: data.logic_id,
        symbol_id: data.symbol_id,
        value: data.value,
      })
    }
  }, [data])

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
              <form className="mt-3 w-full">
                <div className="flex w-full justify-center gap-4 flex-wrap">
                  <Controller
                    control={control}
                    name="symbol_id"
                    render={({ field }) => (
                      <Select
                        fullWidth
                        label="Select Symbol"
                        className="max-w-xs"
                        disabledKeys={['']}
                        {...field}
                        selectedKeys={[field.value?.toString() || '']}
                        isDisabled={!isEdit}
                      >
                        {dataSymbol.length > 0 ? (
                          dataSymbol.map((symbol) => (
                            <SelectItem
                              key={symbol.symbol_id}
                              value={symbol.symbol_id}
                            >
                              {symbol.symbol}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem key="">No Symbols Available</SelectItem>
                        )}
                      </Select>
                    )}
                  />
                  <Controller
                    control={control}
                    name="indicator_id"
                    render={({ field }) => (
                      <Select
                        fullWidth
                        label="Select Condition"
                        className="max-w-xs"
                        disabledKeys={['']}
                        {...field}
                        selectedKeys={[field.value?.toString() || '']}
                        isDisabled={!isEdit}
                      >
                        {dataIndicator.length > 0 ? (
                          dataIndicator.map((indicator) => (
                            <SelectItem
                              key={indicator.indicator_id}
                              value={indicator.indicator_id}
                            >
                              {indicator.name}
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
                        fullWidth
                        label="Select Logic"
                        disabledKeys={['']}
                        className="max-w-xs"
                        {...field}
                        selectedKeys={[field.value?.toString() || '']}
                        isDisabled={!isEdit}
                      >
                        {dataLogic.length > 0 ? (
                          dataLogic.map((logic) => (
                            <SelectItem
                              key={logic.logic_id}
                              value={logic.logic_id}
                            >
                              {logic.condition}
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
                        disabledKeys={[watch('indicator_id')]}
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
                    name="action_id"
                    render={({ field }) => (
                      <Select
                        fullWidth
                        label="Select Action"
                        disabledKeys={['']}
                        className="max-w-xs"
                        {...field}
                        value={field.value?.toString() || ''}
                        selectedKeys={[field.value?.toString() || '']}
                        isDisabled={!isEdit}
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
                        })
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
              </form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalDetail
