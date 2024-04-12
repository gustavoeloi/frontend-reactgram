import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu";

import { useSelector } from "react-redux";

import { LogOut, User, PenLine, Settings2, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { upload } from "@/utils/config";

const NavbarProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout() as unknown as UnknownAction);
    dispatch(reset());

    navigate("/login");
  };

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.profileImage ? (
          <img
            src={`${upload}/users/${user?.profileImage}`}
            alt={user.name}
            className="rounded-full h-10 w-10"
          />
        ) : (
          <User size={32} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate(`/users/${user?._id}`)}
          >
            Ver perfil
            <DropdownMenuShortcut>
              <UserRound size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Gerenciar Posts
            <DropdownMenuShortcut>
              <Settings2 size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Atualizar Perfil
            <DropdownMenuShortcut>
              <PenLine size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Sair
            <DropdownMenuShortcut>
              <LogOut size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarProfile;
