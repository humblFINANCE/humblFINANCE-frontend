'use client'

import { signOut } from '@/app/(landing-page)/logout/action'
import { Icon } from '@iconify/react'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import React from 'react'

export default function LogoutModalButton({
  onClose,
}: {
  onClose: () => void
}) {
  const [selectedOption, setSelectedOption] = React.useState<any>(
    new Set(['global'])
  )

  const [loading, setLoading] = React.useState(false)

  const descriptionsMap = {
    global: 'Global logs out from all of your sessions.',
    local: 'Local logs out from the current session.',
    others: 'Others logs out from all other sessions except the current one.',
  }

  const labelsMap = {
    global: 'Global Logout',
    local: 'Local Logout',
    others: 'Others Logout',
  }

  // Convert the Set to an Array and get the first value.
  type OptionKeys = keyof typeof labelsMap
  const selectedOptionValue = Array.from(selectedOption)[0] as OptionKeys
  const handleSelectionChange = (keys: Selection) => {
    // Convert the Selection to a Set<string>
    const selectedKeys = keys as unknown as Set<string>
    setSelectedOption(selectedKeys)
  }

  const handleSignout = async () => {
    localStorage.removeItem('selectedWatchlistId')
    setLoading(true)
    await signOut(selectedOptionValue)
    setLoading(false)
    onClose()
  }

  return (
    <ButtonGroup variant="ghost" color="success">
      <Button isLoading={loading} onPress={handleSignout}>
        {labelsMap[selectedOptionValue]}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <Icon icon="solar:alt-arrow-down-linear" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={(keys) =>
            handleSelectionChange(keys as unknown as Selection)
          }
          className="max-w-[300px]"
        >
          <DropdownItem key="global" description={descriptionsMap['global']}>
            {labelsMap['global']}
          </DropdownItem>
          <DropdownItem key="local" description={descriptionsMap['local']}>
            {labelsMap['local']}
          </DropdownItem>
          <DropdownItem key="others" description={descriptionsMap['others']}>
            {labelsMap['others']}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
