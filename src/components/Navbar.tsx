import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Search, X } from "lucide-react";
import { clsx } from "clsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { id: 1, label: "Login", toPath: "/login" },
    { id: 2, label: "Register", toPath: "/register" },
  ];

  return (
    <>
      <nav className="flex justify-between px-8 items-center py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Menu
              size={32}
              className="cursor-pointer lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            />
            <Link to="/" className="font-mono text-4xl">
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
          <div className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex w-56">
            <X
              size={32}
              className="mt-0 mb-8 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />

            {links.map((link) => (
              <Link
                key={link.id}
                to={link.toPath}
                className="font-bold text-xl"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search size={32} />
          <User size={32} />
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
