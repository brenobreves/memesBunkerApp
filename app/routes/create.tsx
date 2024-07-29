import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate, Form, useActionData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import Input from "~/components/Input";
import { PUBLIC_API } from "~/utils/constants";
import Select from "~/components/Select";
import { useToken } from "~/contexts/AuthContext";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { parse } from "cookie";

interface ActionData {
  error?: string;
}
export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Criar Meme", content: "Save_meme_page" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const url = formData.get("url");
  const type = formData.get("type");
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parse(cookieHeader || "");
  const token = cookies.authToken;

  if (typeof url !== "string" || typeof type !== "string" || typeof token !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  try {
    const response = await fetch(`${PUBLIC_API}/memes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ type, link: url }),
    });

    if (!response.ok) {
      const resData = await response.json();
      return json({ error: resData.message || "Failed to create meme" }, { status: response.status });
    }

    return redirect("/home");
  } catch (error) {
    console.error("Error creating meme:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};

export default function createMemePage() {
  const [form, setForm] = useState({url:"", type:""})
  const { token } = useToken()
  const actionData = useActionData<ActionData>()

  const navigate = useNavigate()
  
  useEffect(() => {
    if(!token) navigate("/")
  },[])

  function handleForm(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    setForm({...form, [e.target.name]: e.target.value})
  }

  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        <img src="/meme-logo-removebg-preview.png"/>
      <Form method="POST" className="bg-sky-700 flex flex-col gap-4 p-4 rounded-lg max-w-[700px] mb-4">
        <Input name="url" value={form.url} onChange={handleForm} placeholder="url" type="text"/>
        <Select name="type" onChange={handleForm}>
            <option value={""}>Selecione um tipo</option>
            <option value="image">Imagem</option>
            <option value="link">Link</option>
        </Select>
        <button className=" bg-slate-300 rounded-md text-slate-500" type="submit">Salvar</button>
      </Form>

      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}

      <Link className="text-sky-900 w-auto text-center p-4 bg-slate-300 rounded-xl" to="/home">
        Voltar
      </Link>
    </div>
  )
}
