import {
  Dialog,
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

const DialogNewPost = () => {
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

        <div className="">
          <form className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <Input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Titulo"
              />
            </div>
            <div className="col-span-4">
              <Textarea
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Descrição"
              />
            </div>
            <div className="col-span-4">
              <Input
                type="file"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="col-span-4">
              <Button>Postar</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewPost;
