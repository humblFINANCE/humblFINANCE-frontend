"use client";

import { AcmeIcon } from "@/components/icons/Brands";
import { cn } from "@/utils/nextui/cn";
import Button from "@nextui-org/button";
import Link from "@nextui-org/link";
import type { NavbarProps } from "@nextui-org/navbar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import React from "react";

const menuItems = [
  "About",
  "Blog",
  "Customers",
  "Pricing",
  "Enterprise",
  "Changelog",
  "Documentation",
  "Contact Us",
];

export default function Component(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      {...props}
      isBordered
      classNames={{
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center bg-transparent",
        item: "hidden md:flex",
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
        <span className="ml-2 font-medium">ACME</span>
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-medium backdrop-blur-md backdrop-saturate-150 md:flex dark:bg-default-100/50"
        justify="center"
      >
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="foreground" href="#" size="sm">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="ml-2 !flex gap-2">
          <Button
            className="bg-default-100 text-default-700 sm:bg-transparent sm:text-default-500"
            radius="full"
            variant="light"
          >
            Login
          </Button>
          <Button
            className="hidden border-small border-secondary-500/20 bg-secondary-500/10 text-secondary-800 sm:flex"
            color="secondary"
            radius="full"
            style={{
              boxShadow: "inset 0 0 4px #bf97ff70",
            }}
            variant="flat"
          >
            Start Free Trial
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: {opacity: 0, y: -20},
          animate: {opacity: 1, y: 0},
          exit: {opacity: 0, y: -20},
          transition: {
            ease: "easeInOut",
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
    </Navbar>
  );
}
