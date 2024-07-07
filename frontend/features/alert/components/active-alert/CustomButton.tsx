import { Icon } from '@iconify/react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { CustomCellRendererProps } from 'ag-grid-react'
import React from 'react'

interface Props {
  params: CustomCellRendererProps
  index: number
  onClickDetail: () => void
  onClickDelete: () => void
}

const CustomButton: React.FC<Props> = (props) => {
  return (
    <Dropdown placement="top">
      <DropdownTrigger>
        <Button className="border-none bg-transparent" isIconOnly>
          <Icon icon="mdi:dots-vertical" fontSize={26} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="new"
          onPress={() => props.onClickDetail()}
          startContent={
            <>
              <Icon icon="solar:eye-line-duotone" fontSize={20} />
            </>
          }
        >
          Detail
        </DropdownItem>
        <DropdownItem
          className="text-danger"
          key="copy"
          onPress={() => props.onClickDelete()}
          startContent={
            <>
              <Icon icon="ic:outline-delete-forever" fontSize={20} />
            </>
          }
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default CustomButton
