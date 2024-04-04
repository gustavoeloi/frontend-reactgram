import { Link, NavLink } from "react-router-dom";
import { Menu, User, Search, X } from "lucide-react";
import { clsx } from "clsx";

//hooks
import { useAuth } from "@/hooks/useAuth";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { auth } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

  console.log(user);

  const links = [];

  if (!auth) {
    links.push({ id: 1, label: "Login", toPath: "/login" });
    links.push({ id: 2, label: "Register", toPath: "/register" });
  }

  if (auth) {
    links.push({ id: 3, label: "Home", toPath: "/home" });
    links.push({ id: 4, label: "Profile", toPath: `/users/${user?._id}` });
  }

  const focusInput = () => {
    setIsMenuOpen(true);
    if (searchRef.current !== null) {
      searchRef.current.focus();
    }
  };

  return (
    <>
      <nav className="flex justify-between px-8 items-center py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            {auth ? (
              <Link to={`/users/${user?._id}`} className="cursor-pointer">
                <Menu
                  size={32}
                  className="cursor-pointer lg:hidden"
                  onClick={() => setIsMenuOpen(true)}
                />
              </Link>
            ) : null}
            <Link to="/" className="font-mono  text-2xl md:text-4xl">
              ReactGram
            </Link>
          </div>

          {links.map((link) => (
            <Link
              key={link.id}
              to={link.toPath}
              className="text-gray-400 hover:text-black hidden lg:block text-xl"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",
            isMenuOpen && "translate-x-0 "
          )}
        >
          <div className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex w-94">
            <X
              size={32}
              className="mt-0 mb-8 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                ref={searchRef}
                className="pl-10 py-2 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none "
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search />
              </div>
            </div>
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.toPath}
                className="font-bold text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search size={32} className="lg:hidden" onClick={focusInput} />
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="pl-10 py-2 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none "
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search />
            </div>
          </div>
          {auth && <NavbarProfile />}
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
