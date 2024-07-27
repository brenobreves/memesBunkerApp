import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React, { useState } from "react";
import Form from "~/components/Form";
import Input from "~/components/Input";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "signin_page", content: "Login" },
  ];
};

export default function SignUpPage() {
  const [form, setForm] = useState({email:"" , senha:""})

  function handleForm(e: React.ChangeEvent<HTMLInputElement>){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
  }
  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        <h1 className="uppercase w-full text-center text-5xl text-slate-200">memes bunker</h1>
        <img src="/meme-logo-removebg-preview.png" className="max-w-[700px]"/>
      <Form handlerFunction={handleSubmit}>
        <Input name="email" value={form.email} onChange={handleForm} placeholder="E-mail" type="email"/>
        <Input name="senha" value={form.senha} onChange={handleForm} placeholder="Senha" type="password"/>
        <button className=" bg-slate-300 rounded-md text-slate-500" type="submit">Login</button>
      </Form>

      <Link className="text-slate-200 w-full text-center" to="/signup">
        Não tem uma conta? Cadastre-se!
      </Link>
    </div>
  )
}