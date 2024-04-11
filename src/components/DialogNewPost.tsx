import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { useForm } from "react-hook-form";

import { publishPhoto } from "@/slices/photoSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { LegacyRef, useState } from "react";

const DialogNewPost = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state: RootState) => state.photo
  );

  const { register, handleSubmit, setValue } = useForm();

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setValue("photo", file);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
          <DialogDescription>
            Adicione um novo post. Compartilhe seus moments
          </DialogDescription>
        </DialogHeader>
        <div className="pt-2 pb-4 mb-4 flex flex-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 w-full"
          >
            <label className="mb-2 text-gray-700 text-sm ">
              <input
                type="text"
                {...register("title")}
                placeholder="Digite o título do seu post"
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label className="mb-2 text-gray-700 text-sm ">
              <textarea
                {...register("description")}
                placeholder="Digite a descrição do seu post"
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
              />
            </label>
            <label className="mb-2 text-gray-700 text-sm ">
              <input
                type="file"
                onChange={handleFile}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <Button type="submit">Publicar</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewPost;
