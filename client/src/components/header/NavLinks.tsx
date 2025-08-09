import { NavLink } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const NavLinks = ({
  className,
  handleNavLinkClick,
}: {
  className?: string;
  handleNavLinkClick?: () => void;
}) => {
  const baseStyle = `${className} flex items-center justify-center p-2 rounded-md font-semibold hover:bg-gray-200 hover:text-primary`;
  return (
    <>
      <NavLink
        onClick={handleNavLinkClick}
        to="/schedule"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-blue-700" : "text-black"}`
        }
      >
        <AiOutlineSchedule />
        Agendamento
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to="/persons"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-blue-700" : "text-black"}`
        }
      >
        <FaUserAlt />
        Pessoas
      </NavLink>
    </>
  );
};

export default NavLinks;
