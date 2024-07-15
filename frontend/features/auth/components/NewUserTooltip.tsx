import { Tooltip } from '@nextui-org/react'

export default function newUserToolTip() {
  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-medium font-bold">First Time User?</div>
          <div className="text-small">
            If you have not signed up yet, when you sign in for the first time,
            the password that you enter will be set as your account password.
          </div>
        </div>
      }
      placement="bottom"
    >
      <div className="cursor-pointer text-default-500 text-center pt-2">
        New User?
      </div>
    </Tooltip>
  )
}
