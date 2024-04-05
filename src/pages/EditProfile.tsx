import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  profileImage: z.string(),
  bio: z.string(),
  password: z.string(),
});

const EditProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      profileImage: "",
      bio: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updateValues = values;

    console.log(updateValues);
  }

  return (
    <div className="mx-auto max-w-lg my-8 border rounded-sm py-6 px-8 ">
      <h1 className="text-3xl font-medium">Editar Perfil &#128491;</h1>
      <p className="text-slate-400">
        Deixe seu perfil mais completo e adicione uma imagem e uma biografia
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="py-3 px-4 rounded-lg border w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="py-3 px-4 rounded-lg border w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Imagem de Perfil{" "}
                  <span className="text-sm text-gray-500">(PNG ou JPG)</span>
                </FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Fale um pouco sobre você &#129331;"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Senha{" "}
                  <span className="text-gray-400">
                    (deseja alterar a senha?)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="password"
                    className="py-3 px-4 rounded-lg border w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Atualizar</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
