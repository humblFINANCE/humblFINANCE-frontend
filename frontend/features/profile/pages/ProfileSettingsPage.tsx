'use client'

import type { CardProps } from '@nextui-org/react'

import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { AccountSetting } from '@/features/profile/components/AccountSetting'
import { SecuritySetting } from '@/features/profile/components/SecuritySetting'
import { NotificationSetting } from '@/features/profile/components/NotificationSetting'
import {FinancialServiceSetting} from "@/features/profile/components/FinancialServiceSetting";

export function ProfileSettingsPage() {
  return (
    <div className="h-full overflow-y-scroll">
      <Tabs
        classNames={{
          tabList: 'mx-4 mt-6 text-medium',
          tabContent: 'text-small',
        }}
        size="lg"
      >
        <Tab
          key="account-settings"
          textValue="Account Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:user-id-bold" width={20} />
              <p>Account</p>
            </div>
          }
        >
          <AccountSetting className="p-2  shadow-none overflow-y-scroll" />
        </Tab>
          <Tab
              key="financial-services"
              textValue="Financial Services"
              title={
                  <div className="flex items-center gap-1.5">
                      <Icon icon="material-symbols:finance-rounded" width={20} />
                      <p>Financial Services</p>
                  </div>
              }
          >
              <FinancialServiceSetting className="p-2  shadow-none overflow-y-scroll" />
          </Tab>
        <Tab
          key="notifications-settings"
          textValue="Notification Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:bell-bold" width={20} />
              <p>Notifications</p>
            </div>
          }
        >
          <NotificationSetting className="p-2  shadow-none" />
        </Tab>
        <Tab
          key="security-settings"
          textValue="Security Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:shield-keyhole-bold" width={20} />
              <p>Security</p>
            </div>
          }
        >
          <SecuritySetting className="p-2  shadow-none" />
        </Tab>
      </Tabs>
    </div>
  )
}
