import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import Form from "~/components/Form";
import Input from "~/components/Input";
import { PUBLIC_API } from "~/utils/constants";

export const meta: MetaFunction = () => {
  return [
    { title: "Cadatro " },
    { name: "signup_page", content: "Register" },
  ];
};

export default function SignUpPage() {
  const [form, setForm] = useState({nome:"" , email:"" , senha:"", confirm:""})

  const navigate = useNavigate()
  function handleForm(e: React.ChangeEvent<HTMLInputElement>){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(form.senha !== form.confirm){
      alert("A senha confirmada é diferente da informada")
      return
    }
    const reqBody = {
      name: form.nome,
      email: form.email,
      password: form.senha
    }
    const response = await fetch(
      `${PUBLIC_API}/user/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      }
    )
    const resData = JSON.parse(await response.text())
    if(response.status !== 200){
      alert(`${resData.message || resData}`)
      return
    }
    navigate("/")
  }
  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        <h1 className="uppercase w-full text-center text-5xl text-slate-200">memes bunker</h1>
        <img src="/meme-logo-removebg-preview.png"/>
      <Form handlerFunction={handleSubmit}>
        <Input name="nome" value={form.nome} onChange={handleForm} placeholder="Nome" type="text"/>
        <Input name="email" value={form.email} onChange={handleForm} placeholder="E-mail" type="email"/>
        <Input name="senha" value={form.senha} onChange={handleForm} placeholder="Senha" type="password"/>
        <Input name="confirm" value={form.confirm} onChange={handleForm} placeholder="Confirme a senha" type="password"/>
        <button className=" bg-slate-300 rounded-md text-slate-500" type="submit">Cadastrar</button>
      </Form>

      <Link className="text-slate-200 w-full text-center" to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </div>
  )
}
