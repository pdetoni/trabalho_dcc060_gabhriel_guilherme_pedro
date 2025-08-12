"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const NavLinks = ({
  className,
  handleNavLinkClick,
}: {
  className?: string;
  handleNavLinkClick?: () => void;
}) => {
  const pathname = usePathname();
  const baseStyle = `${className} flex items-center justify-center p-2 rounded-md font-semibold hover:bg-gray-200 hover:text-primary`;
  const links = [
    { href: "/agendamento", label: "Agendamento", icon: <AiOutlineSchedule /> },
    { href: "/persons", label: "Pessoas", icon: <FaUserAlt /> },
  ];

  return (
    <>
      {links.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        const activeClass = isActive ? "text-blue-700" : "text-black";
        return (
          <Link
            key={href}
            href={href}
            onClick={handleNavLinkClick}
            className={`${baseStyle} ${activeClass}`}
          >
            {icon}
            {label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
