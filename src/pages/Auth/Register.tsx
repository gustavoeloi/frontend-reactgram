import { useEffect, useState } from "react";

import cameraSVG from "@/assets/camera-svg.svg";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//shadcn
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { register, reset } from "@/slices/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { RegisterData } from "@/utils/interfaces";
import { UnknownAction } from "@reduxjs/toolkit";

const formSchema = z
  .object({
    email: z.string().email({ message: "Digite um email válido" }),
    name: z.string().min(3, {
      message: "O nome de usuário deve ter pelo menos 5 caracteres",
    }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
      .max(100, { message: "A senha deve ter no máximo 100 caracteres" }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "As senhas não são iguais!",
    path: ["confirmpassword"],
  });

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
    },
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user: RegisterData = values;
    dispatch(register(user) as unknown as UnknownAction);
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="md:grid grid-cols-2 px-8">
      <div className="">
        <div>
          <div className="mt-16 mb-6">
            <h2 className="font-medium text-xl">
              Junte-se a nós. Transforme momentos em memórias compartilhadas,
              busque inspiração no nosso mundo e celebre a vida.
            </h2>
            <p className="text-lg mt-4">Criar sua conta</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border p-4 shadow-lg  space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome de usuário"
                        {...field}
                        className="py-6 text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user@email.com"
                        {...field}
                        className="py-6 text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="py-6 text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm your password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="py-6 text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>
                Já tem conta?{" "}
                <Link
                  to={"/login"}
                  className="underline text-sky-800 font-bold"
                >
                  Entre aqui
                </Link>
              </p>
              <Button type="submit" className="mt-8">
                Cadastrar
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className=" hidden md:flex items-center justify-center">
        <img src={cameraSVG} alt="Camera" className="w-full max-h-[500px]" />
      </div>
    </div>
  );
};

export default Register;
