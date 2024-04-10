import React, { useState } from "react";

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
  profileImage: z.string().optional(),
  bio: z.string(),
  password: z.string(),
});

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { profile, resetMessage, updateProfile } from "@/slices/userSlice";
import { RootState } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { upload } from "@/utils/config";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState();
  const [profileImage, setProfileImage] = useState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      profileImage: "",
      bio: "",
      password: "",
    },
  });

  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(profile() as unknown as UnknownAction);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");
      form.setValue("bio", user.bio || "");
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: Record<string, any> = {
      name: values.name,
    };

    if (values.bio) {
      data.bio = values.bio;
    }

    if (values.profileImage) {
      data.profileImage = values.profileImage;
    }

    if (values.password) {
      data.password = values.password;
    }

    if (profileImage) {
      data.profileImage = profileImage;
    }

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    await dispatch(updateProfile(formData) as unknown as UnknownAction);

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleFile = (e) => {
    //image preview
    const image = e.target.files[0];

    setPreviewImage(image);
    setProfileImage(image);
  };

  return (
    <div className="mx-auto max-w-lg my-8 border rounded-sm py-6 px-8 ">
      <h1 className="text-3xl font-medium">Editar Perfil &#128491;</h1>
      <p className="text-slate-400">
        Deixe seu perfil mais completo e adicione uma imagem e uma biografia
      </p>

      {(user?.profileImage || previewImage) && (
        <Avatar className="h-32 w-32 mx-auto mt-8">
          <AvatarImage
            src={
              previewImage
                ? URL.createObjectURL(previewImage)
                : `${upload}/users/${user?.profileImage}`
            }
            className=""
            sizes="lg"
            alt="User Icon"
          />
          <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
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
                    disabled
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
                  <Input type="file" {...field} onChange={handleFile} />
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
            name="password"
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
              Atualizar
            </Button>
          ) : (
            <Button type="submit" className="mt-8" disabled>
              Atualizando...
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
