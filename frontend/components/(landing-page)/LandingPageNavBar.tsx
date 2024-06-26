'use client'

import { AcmeIcon } from '@/components/icons/Brands'
import { cn } from '@/utils/nextui/cn'
import type { NavbarProps } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from '@nextui-org/react'
import React from 'react'
import { LoginModal } from '@/features/login/components/LoginModal'

const menuItems = ['Home', 'Features', 'About Us', 'Investing Framework']

export default function Component(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const disclosure = useDisclosure()
  const pathname = usePathname()

  const checkActive = (path: string) => {
    return pathname === path
  }

  return (
    <Navbar
      {...props}
      isBordered
      classNames={{
        base: cn('border-default-100', {
          'bg-default-200/50 dark:bg-default-100/50': isMenuOpen,
        }),
        wrapper: 'w-full justify-center bg-transparent',
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-secondary',
        ],
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarBrand>
        <div className="rounded-full bg-foreground text-background">
          <AcmeIcon size={34} />
        </div>
        <span className="ml-2 font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          humblFINANCE
        </span>
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-medium backdrop-blur-md backdrop-saturate-150 md:flex dark:bg-default-100/50"
        justify="center"
      >
        <NavbarItem isActive={checkActive('/')}>
          <Link className="text-default-500" href="/" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={checkActive('/features')}>
          <Link className="text-default-500" href="/features" size="sm">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive={checkActive('/about-us')}>
          <Link className="text-default-500" href="/about-us" size="sm">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem isActive={checkActive('/investing-framework')}>
          <Link
            className="text-default-500"
            href="/investing-framework"
            size="sm"
          >
            Investing Framework
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="ml-2 !flex gap-2">
          <Button
            className="hidden border-small border-secondary-500/20 bg-secondary-500/10 text-secondary-800 sm:flex"
            color="secondary"
            radius="full"
            style={{
              boxShadow: 'inset 0 0 4px #bf97ff70',
            }}
            variant="flat"
            onClick={disclosure.onOpenChange}
          >
            Dashboard
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: 'easeInOut',
            duration: 0.2,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-default-500" href="#" size="md">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <LoginModal {...disclosure} />
    </Navbar>
  )
}
