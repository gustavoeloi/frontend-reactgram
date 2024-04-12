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

import { publishPhoto, resetMessage } from "@/slices/photoSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { photoUpload } from "@/utils/interfaces";
import { Label } from "./ui/label";

const DialogNewPost = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state: RootState) => state.photo
  );

  const { register, handleSubmit, setValue } = useForm();

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setValue("image", file);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);

    dispatch(publishPhoto(formData));

    setValue("title", "");
    setValue("description", "");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Novo post</Button>
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
            <Label className="mb-2 text-gray-500 text-sm ">
              Título do post
              <Input
                type="text"
                {...register("title")}
                placeholder="Digite o título do seu post"
              />
            </Label>
            <Label className="mb-2 text-gray-500 text-sm ">
              Descrição do post
              <Textarea
                {...register("description")}
                placeholder="Digite a descrição do seu post"
              />
            </Label>
            <Label className="mb-2 text-gray-500 text-sm">
              Imagem do post
              <Input type="file" onChange={handleFile} />
            </Label>
            {error && (
              <p className="py-2 px-1 rounded bg-red-100 border border-red-200 text-red-500 font-medium text-center">
                {error}
              </p>
            )}

            {message && (
              <p className="py-2 px-1 rounded bg-green-100 border border-green-400 text-green-500 font-medium text-center">
                {message}
              </p>
            )}

            {!loading ? (
              <Button type="submit" className="mt-8">
                Postar
              </Button>
            ) : (
              <Button type="submit" className="mt-8" disabled>
                Postando...
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewPost;
