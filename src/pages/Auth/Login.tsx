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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { login, reset } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Login = () => {
  const dispath = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = values;

    dispath(login(user) as unknown as UnknownAction);
  }

  useEffect(() => {
    dispath(reset());
  }, [dispath]);

  return (
    <div className="container mx-auto p-8 flex items-center justify-center">
      <div className="w-full max-w-md shadow-lg border p-8">
        <h1 className="font-bold text-center mb-8">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@email.com"
                      {...field}
                      className="py-3 px-4 rounded-lg border w-full"
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      type="password"
                      {...field}
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

            {!loading ? (
              <Button type="submit" className="mt-8">
                Login
              </Button>
            ) : (
              <Button type="submit" className="mt-8" disabled>
                Entrando...
              </Button>
            )}
            <p className="text-center">
              Não possui conta?{" "}
              <Link to={"/register"} className="underline text-blue-600">
                Cadastrar
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
