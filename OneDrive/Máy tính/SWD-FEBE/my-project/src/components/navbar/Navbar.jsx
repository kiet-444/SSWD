import { Link } from "react-router-dom";
import React, { useState } from "react";
import Dropdown from "components/dropdown";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import avatar from "../../assets/img/avatars/avatar3.png";

export default function Navbar() {
  const [isSideMenuOpen, setMenu] = useState(false);

  const navlinks = [
    {
      label: "Jewelry",
      link: "#",
    },
    {
      label: "Orders",
      link: "/orders",
    },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/auth/");
  };
  return (
    <main>
      <nav className="flex items-center justify-between px-8 py-6 ">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="cursor-pointer text-3xl lg:hidden"
            />
            {/* logo */}
            <Link to={"/home"} className="font-mono text-4xl text-bloom">
              Alumina
            </Link>
          </section>
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className="hover:text-black hidden text-hemp lg:block"
              to={d.link}
            >
              {d.label}
            </Link>
          ))}
        </div>

        {/* sidebar mobile menu */}
        <div
          className={clsx(
            " bg-black/50 fixed right-0 top-0 h-full  w-screen -translate-x-full backdrop-blur-sm  transition-all  lg:hidden ",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black absolute left-0 top-0 z-50 flex h-screen w-56 flex-col gap-8 bg-white p-8 ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mb-8 mt-0 cursor-pointer text-3xl"
            />

            {navlinks.map((d, i) => (
              <Link key={i} className="font-bold" to={d.link}>
                {d.label}
              </Link>
            ))}
          </section>
        </div>

        <div className="flex items-center">
          <Link to="/cart">
            <AiOutlineShoppingCart className="mr-8 cursor-pointer text-2xl" />
          </Link>
          <Dropdown
            button={
              <img
                className="h-10 w-10 rounded-full"
                src={avatar}
                alt="Elon Musk"
              />
            }
            children={
              <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Hey, Adela
                    </p>{" "}
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

                <div className="flex flex-col p-4">
                  <a
                    onClick={handleLogout}
                    className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>
      </nav>
      <hr className="" />
    </main>
  );
}
