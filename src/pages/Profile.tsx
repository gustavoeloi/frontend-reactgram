import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getUserDetails } from "@/slices/userSlice";
import { RootState } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { upload } from "@/utils/config";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserCog, Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import DialogNewPost from "@/components/DialogNewPost";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: RootState) => state.user);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const { photos, loading: loadingPhotos } = useSelector(
    (state: RootState) => state.photo
  );

  useEffect(() => {
    dispatch(getUserDetails(id ?? "") as unknown as UnknownAction);
  }, [dispatch, id]);

  if (loading) return <div>Loading... </div>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="mb-4">
          {user?.profileImage ? (
            <Avatar className="w-24 h-24">
              <AvatarImage src={`${upload}/users/${user.profileImage}`} />
            </Avatar>
          ) : (
            <Avatar className="w-24 h-24">
              <AvatarFallback>Sem Foto</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center">
            <h1 className="font-medium text-center ">{user?.name}</h1>
            {userAuth?._id === user?._id && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link to="/profile">
                      <UserCog
                        className="ml-2 text-gray-600 border rounded p-1 hover:bg-gray-200 cursor-pointer"
                        size={32}
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Editar Perfil</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-slate-600 text-center">{user?.email}</p>
          {user?.bio ? (
            <p>{user?.bio}</p>
          ) : (
            <p className="italic text-red-300">
              Você não tem BIO, coloque agora e deixe seu perfil mais completo,{" "}
              <Link to={"/profile"} className="underline">
                clique aqui
              </Link>
            </p>
          )}
        </div>
      </div>
      <Separator className="my-4" />

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Minhas Publicações</h2>
          {userAuth?._id === user?._id && <DialogNewPost />}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 h-24"></div>
          <div className="bg-gray-100 h-24"></div>
          <div className="bg-gray-100 h-24"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
