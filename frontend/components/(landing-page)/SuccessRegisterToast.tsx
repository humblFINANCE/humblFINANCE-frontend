'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const SuccessRegisterToast = () => {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  useEffect(() => {
    if (success) toast.success('Account created successfully')
  }, [success])

  return <div></div>
}

export default SuccessRegisterToast
