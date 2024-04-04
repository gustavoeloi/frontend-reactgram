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

import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";

const NavbarProfile = () => {
  const { navigate } = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout() as unknown as UnknownAction);
    dispatch(reset());

    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
          <DropdownMenuItem>Fazer Post</DropdownMenuItem>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Sair
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarProfile;
