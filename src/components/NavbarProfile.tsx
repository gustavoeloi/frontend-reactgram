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

import { LogOut, User, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const NavbarProfile = () => {
  const navigate = useNavigate();

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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/users/")}
          >
            Ver perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Fazer Post
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
