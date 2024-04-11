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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

const formSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .min(6, { message: "M´ínimo de 6 caracteres" })
    .max(30, { message: "Máximo de 30 caracteres" }),
  description: z
    .string()
    .min(10, { message: "M´ínimo de 10 caracteres" })
    .max(200, { message: "Máximo de 200 caracteres" })
    .optional(),
  photo: z.string(),
});

const DialogNewPost = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <Input
                      {...field}
                      placeholder="Título"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Descrição"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Imagem de Perfil{" "}
                      <span className="text-sm text-gray-500">
                        (PNG ou JPG)
                      </span>
                    </FormLabel>
                    <Input type="file" {...field} />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <DialogClose asChild>
                  <Button variant={"secondary"}>Cancelar</Button>
                </DialogClose>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewPost;
