"use client";

import { useState } from "react";
import Nav from "./Nav";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Image from "next/image";

const Header = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  const handleMobileNavIsOpenChange = () => {
    setMobileNavIsOpen(!mobileNavIsOpen);
  };

  const handleNavLinkClick = () => {
    setMobileNavIsOpen(false);
  };

  return (
    <header className="bg-gray-100 sticky top-0 z-[10]">
      <div className="p-1 sm:px-6 justify-between shadow-lg flex items-center  ">
        <Link href={"/agendamento"} className="flex items-center mb-auto">
          <Image src={"file.svg"} alt="" width={32} height={32} />
          <h1 className="text-3xl ml-2 font-ptSerif text-blue-700">
            Sistema Médico
          </h1>
        </Link>

        <div className="flex items-center justify-center">
          <Nav
            mobileNavIsOpen={mobileNavIsOpen}
            handleMobileNavIsOpenChange={handleMobileNavIsOpenChange}
          />
        </div>
      </div>
      {mobileNavIsOpen && (
        <div className="sm:hidden bg-gray-100 shadow-md">
          <NavLinks
            className="text-xl"
            handleNavLinkClick={handleNavLinkClick}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
