'use client'

import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
} from '@nextui-org/react'
import { CalendarDate, parseDate, today } from '@internationalized/date'

interface HumblCompassParameterModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onStartDateChange: (date: string) => void
  currentStartDate: string
}

export function HumblCompassParameterModal({
  isOpen,
  onOpenChange,
  onStartDateChange,
  currentStartDate,
}: HumblCompassParameterModalProps) {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null)

  useEffect(() => {
    if (currentStartDate) {
      setSelectedDate(parseDate(currentStartDate))
    }
  }, [currentStartDate])

  const handleDateChange = (date: CalendarDate) => {
    setSelectedDate(date)
  }

  const handleSave = () => {
    if (selectedDate) {
      onStartDateChange(selectedDate.toString())
    }
    onOpenChange()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              humblCOMPASS Parameters
            </ModalHeader>
            <ModalBody>
              <DatePicker
                label="Start Date"
                value={selectedDate}
                onChange={handleDateChange}
                minDate={parseDate('2000-01-01')}
                maxDate={today('UTC')}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
