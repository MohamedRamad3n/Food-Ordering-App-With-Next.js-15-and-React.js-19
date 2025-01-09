"use client";

import { Pages, Routes } from "@/constants/enums";
import Link from "../link";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { Menu, XIcon } from "lucide-react";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const links = [
    { title: "Menu", href: Routes.MENU },
    { title: "About", href: Routes.ABOUT },
    { title: "Contact", href: Routes.CONTACT },
    { title: "Login", href: `${Routes.AUTH}/${Pages.LOGIN}` },
  ].map((link) => ({ ...link, id: crypto.randomUUID() }));

  return (
    <nav className="flex-1 justify-end flex">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
        aria-expanded={openMenu}
        aria-label="Open menu"
      >
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-10 right-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
          aria-label="Close menu"
        >
          <XIcon className="!w-6 !h-6" />
        </Button>

        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${link.href}`}
              className={`${
                link.href === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({ size: "lg" })} !px-8 !rounded-full`
                  : "hover:text-primary duration-200 transition-colors"
              } font-semibold`} // Applied as part of className
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
