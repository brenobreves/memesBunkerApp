import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import Input from "~/components/Input";
import Form from "~/components/Form";
import { PUBLIC_API } from "~/utils/constants";
import Select from "~/components/Select";
import { useToken } from "~/contexts/AuthContext";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Criar Meme", content: "Save_meme_page" },
  ];
};

export default function createMemePage() {
  const [form, setForm] = useState({url:"", type:""})
  const { token } = useToken()

  const navigate = useNavigate()
  
  useEffect(() => {
    if(!token) navigate("/")
  },[])

  function handleForm(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(!form.type){
        alert("Selecione um tipo!")
        return
    }
    const reqBody = {
        type: form.type,
        link: form.url
    }
    const response = await fetch(
      `${PUBLIC_API}/memes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqBody)
      }
    )
    const resData = JSON.parse(await response.text())
    if(response.status !== 201){
      alert(`${resData.message || resData}`)
      return
    }
    navigate("/home")
  }
  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        <img src="/meme-logo-removebg-preview.png"/>
      <Form handlerFunction={handleSubmit}>
        <Input name="url" value={form.url} onChange={handleForm} placeholder="url" type="text"/>
        <Select name="type" onChange={handleForm}>
            <option value={""}>Selecione um tipo</option>
            <option value="image">Imagem</option>
            <option value="link">Link</option>
        </Select>
        <button className=" bg-slate-300 rounded-md text-slate-500" type="submit">Salvar</button>
      </Form>

      <Link className="text-sky-900 w-auto text-center p-4 bg-slate-300 rounded-xl" to="/home">
        Voltar
      </Link>
    </div>
  )
}
