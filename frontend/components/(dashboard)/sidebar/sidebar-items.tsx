import { Icon } from '@iconify/react'
import { Chip } from '@nextui-org/react'

import {
  SidebarItemType,
  type SidebarItem,
} from '@/components/(dashboard)/sidebar/Sidebar'
import AbbreviatedAvatar from '@/components/(dashboard)/sidebar/AbbreviatedAvatar'

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  {
    key: 'home',
    href: '/dashboard/home',
    icon: 'solar:home-2-linear',
    title: 'Home',
  },
  {
    key: 'humblPORTFOLIO',
    href: '/dashboard/humblPORTFOLIO',
    icon: 'solar:widget-2-outline',
    title: 'humblPORTFOLIO',
  },
  {
    key: 'humblALERTS',
    href: '/dashboard/humblALERTS',
    icon: 'solar:bell-line-duotone',
    title: 'humblALERTS',
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: 'team',
    href: '#',
    icon: 'solar:users-group-two-rounded-outline',
    title: 'Team',
  },
  {
    key: 'tracker',
    href: '#',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: 'analytics',
    href: '#',
    icon: 'solar:chart-outline',
    title: 'Analytics',
  },
  {
    key: 'perks',
    href: '#',
    icon: 'solar:gift-linear',
    title: 'Perks',
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: 'expenses',
    href: '#',
    icon: 'solar:bill-list-outline',
    title: 'Expenses',
  },
  {
    key: 'settings',
    href: '#',
    icon: 'solar:settings-outline',
    title: 'Settings',
  },
]

export const sectionItems: SidebarItem[] = [
  {
    key: 'main',
    title: 'Main',
    items: [
      {
        key: 'home',
        href: '/dashboard/home',
        icon: 'solar:home-2-linear',
        title: 'Home',
      },
      {
        key: 'humblPORTFOLIO',
        href: '/dashboard/humblPORTFOLIO',
        icon: 'solar:folder-with-files-line-duotone',
        title: 'humblPORTFOLIO',
        // endContent: (
        //   <Icon
        //     className="text-default-400"
        //     icon="solar:add-circle-line-duotone"
        //     width={24}
        //   />
        // ),
      },
      {
        key: 'humblALERTS',
        href: '/dashboard/humblALERTS',
        icon: 'solar:bell-line-duotone',
        title: 'humblALERTS',
        endContent: (
          <Chip size="sm" variant="flat" color="warning">
            🚧
          </Chip>
        ),
      },
    ],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    items: [
      {
        key: 'humblCOMPASS',
        href: '/dashboard/humblCOMPASS',
        title: 'humblCOMPASS',
        icon: 'solar:compass-line-duotone',
        endContent: (
          <Chip size="sm" variant="flat" color="warning">
            🚧
          </Chip>
        ),
        items: [
          {
            key: 'shareholders',
            href: '#',
            title: 'Shareholders',
          },
          {
            key: 'note_holders',
            href: '#',
            title: 'Note Holders',
          },
          {
            key: 'transactions_log',
            href: '#',
            title: 'Transactions Log',
          },
        ],
      },
      {
        key: 'humblCHANNEL',
        href: '/dashboard/humblCHANNEL',
        icon: 'solar:align-vertical-spacing-line-duotone',
        title: 'humblCHANNEL',
        endContent: (
          <Chip size="sm" variant="flat" color="warning">
            🚧
          </Chip>
        ),
      },
    ],
  },
]

export const sectionItemsWithTeams: SidebarItem[] = [
  ...sectionItems,
  {
    key: 'quick-access',
    title: 'Quick Access',
    items: [
      {
        key: 'sector-overview',
        href: '#',
        title: 'Sector Overview',
        startContent: <AbbreviatedAvatar name="Sector Overview" />,
      },
      {
        key: 'mag7',
        href: '#',
        title: 'Magnificent 7',
        startContent: <AbbreviatedAvatar name="Magnificent 7" />,
      },
      {
        key: 'sector-overview-pro',
        href: '#',
        title: 'Sector Overview Pro',
        startContent: <AbbreviatedAvatar name="Sector Overview Pro" />,
      },
    ],
  },
]

export const brandItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'home',
        href: '#',
        icon: 'solar:home-2-linear',
        title: 'Home',
      },
      {
        key: 'projects',
        href: '#',
        icon: 'solar:widget-2-outline',
        title: 'Projects',
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: 'tasks',
        href: '#',
        icon: 'solar:checklist-minimalistic-outline',
        title: 'Tasks',
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: 'team',
        href: '#',
        icon: 'solar:users-group-two-rounded-outline',
        title: 'Team',
      },
      {
        key: 'tracker',
        href: '#',
        icon: 'solar:sort-by-time-linear',
        title: 'Tracker',
        endContent: (
          <Chip
            className="bg-primary-foreground font-medium text-primary"
            size="sm"
            variant="flat"
          >
            New
          </Chip>
        ),
      },
    ],
  },
  {
    key: 'your-teams',
    title: 'Your Teams',
    items: [
      {
        key: 'nextui',
        href: '#',
        title: 'Sector Overview',
        startContent: (
          <AbbreviatedAvatar
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80',
            }}
            name="Next UI"
          />
        ),
      },
      {
        key: 'tailwind-variants',
        href: '#',
        title: 'Tailwind Variants',
        startContent: (
          <AbbreviatedAvatar
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80',
            }}
            name="Tailwind Variants"
          />
        ),
      },
      {
        key: 'nextui-pro',
        href: '#',
        title: 'Sector Overview Pro',
        startContent: (
          <AbbreviatedAvatar
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80',
            }}
            name="Sector Overview Pro"
          />
        ),
      },
    ],
  },
]

export const sectionLongList: SidebarItem[] = [
  ...sectionItems,
  {
    key: 'payments',
    title: 'Payments',
    items: [
      {
        key: 'payroll',
        href: '#',
        title: 'Payroll',
        icon: 'solar:dollar-minimalistic-linear',
      },
      {
        key: 'invoices',
        href: '#',
        title: 'Invoices',
        icon: 'solar:file-text-linear',
      },
      {
        key: 'billing',
        href: '#',
        title: 'Billing',
        icon: 'solar:card-outline',
      },
      {
        key: 'payment-methods',
        href: '#',
        title: 'Payment Methods',
        icon: 'solar:wallet-money-outline',
      },
      {
        key: 'payouts',
        href: '#',
        title: 'Payouts',
        icon: 'solar:card-transfer-outline',
      },
    ],
  },
  {
    key: 'your-teams',
    title: 'Your Teams',
    items: [
      {
        key: 'sector-overview',
        href: '#',
        title: 'Sector Overview',
        startContent: <AbbreviatedAvatar name="Next UI" />,
      },
      {
        key: 'sector-overview-pro',
        href: '#',
        title: 'Sector Overview Pro',
        startContent: <AbbreviatedAvatar name="Tailwind Variants" />,
      },
      {
        key: 'sector-overview-pro',
        href: '#',
        title: 'Sector Overview Pro',
        startContent: <AbbreviatedAvatar name="Sector Overview Pro" />,
      },
    ],
  },
]

export const sectionNestedItems: SidebarItem[] = [
  {
    key: 'home',
    href: '#',
    icon: 'solar:home-2-linear',
    title: 'Home',
  },
  {
    key: 'projects',
    href: '#',
    icon: 'solar:widget-2-outline',
    title: 'Projects',
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: 'tasks',
    href: '#',
    icon: 'solar:checklist-minimalistic-outline',
    title: 'Tasks',
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: 'team',
    href: '#',
    icon: 'solar:users-group-two-rounded-outline',
    title: 'Team',
  },
  {
    key: 'tracker',
    href: '#',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: 'analytics',
    href: '#',
    icon: 'solar:chart-outline',
    title: 'Analytics',
  },
  {
    key: 'perks',
    href: '#',
    icon: 'solar:gift-linear',
    title: 'Perks',
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: 'cap_table',
    title: 'Cap Table',
    icon: 'solar:pie-chart-2-outline',
    type: SidebarItemType.Nest,
    items: [
      {
        key: 'shareholders',
        icon: 'solar:users-group-rounded-linear',
        href: '#',
        title: 'Shareholders',
      },
      {
        key: 'note_holders',
        icon: 'solar:notes-outline',
        href: '#',
        title: 'Note Holders',
      },
      {
        key: 'transactions_log',
        icon: 'solar:clipboard-list-linear',
        href: '#',
        title: 'Transactions Log',
      },
    ],
  },
  {
    key: 'expenses',
    href: '#',
    icon: 'solar:bill-list-outline',
    title: 'Expenses',
  },
]
