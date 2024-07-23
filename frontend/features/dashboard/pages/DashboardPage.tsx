'use client'

import React from 'react'
import {Tabs, Tab} from '@nextui-org/react'
import {Icon} from '@iconify/react'

import {AccountSetting} from '@/features/profile/components/AccountSetting'
import {SecuritySetting} from '@/features/profile/components/SecuritySetting'
import {NotificationSetting} from '@/features/profile/components/NotificationSetting'
import {FinancialServiceSetting} from "@/features/profile/components/FinancialServiceSetting";
import {useUser} from "@/features/user/hooks/use-user";

export function DashboardPage() {
    const {user} = useUser()
    return (
        <div className="h-full overflow-y-scroll">
            <p>Hello </p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
