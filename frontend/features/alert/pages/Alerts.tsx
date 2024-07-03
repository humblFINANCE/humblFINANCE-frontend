'use client'

import { Icon } from '@iconify/react'
import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import CreateAlert from '../components/CreateAlert'

function Alerts() {
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
          key="create-alert"
          textValue="Create"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="mdi:bell-plus" width={20} />
              <p>Create</p>
            </div>
          }
        >
          <CreateAlert />
        </Tab>
        <Tab
          key="active-alerts"
          textValue="Active"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="bi:lightning" width={20} />
              <p>Active</p>
            </div>
          }
        >
          <>active</>
        </Tab>
        <Tab
          key="history-alerts"
          textValue="History"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="humbleicons:bars" width={20} />
              <p>History</p>
            </div>
          }
        >
          <>history</>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Alerts
