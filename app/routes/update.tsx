import type { MetaFunction } from "@remix-run/node";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { PUBLIC_API } from "~/utils/constants";
import { useToken } from "~/contexts/AuthContext";
import { parse } from "cookie";
import MemeBlock from "~/components/memeBlock";

type LoaderArgs = {
  request: Request;
};

type Meme = {
  id: string
  created_at: string
  updated_at: string
  type: "link" | "image"
  link: string
  user_id: string
}
interface ActionData {
  error?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Meus Memes", content: "Saved_memes_page" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const memeId = formData.get("memeId");
  const memeLink = formData.get("memeLink")
  const memeType = formData.get("memeType")
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parse(cookieHeader || "");
  const token = cookies.authToken;
  let otherType = ""
  if(memeType === "image"){
    otherType = "link"
  }else {
    otherType = "image"
  }
  
  const reqBody = {
    link: memeLink,
    type: otherType
  }
  
  if (typeof memeId !== "string" || typeof token !== "string") {
    return json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const response = await fetch(`${PUBLIC_API}/memes/${memeId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify(reqBody)
    });

    if (!response.ok) {
      const resData = await response.json();
      return json({ error: resData.message || "Failed to delete meme" }, { status: response.status });
    }
    return redirect("/home")
  } catch (error) {
    console.error("Failed to delete meme:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parse(cookieHeader || "");
  const token = cookies.authToken;

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  try {
    const response = await fetch(`${PUBLIC_API}/memes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Response("Failed to fetch memes", { status: response.status });
    }

    const memes = await response.json();
    return json(memes);
  } catch (error) {
    console.error("Failed to fetch memes:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export default function SavedMemesPage() {
  const { token } = useToken()
  const memes = useLoaderData<Meme[]>()
  const [selectedMemeData, setSelectedMemeData] = useState({id:"", link:"", type:""})
  const actionData = useActionData<ActionData>();

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }
  }, [])

  function handleUpdate() {
    if (!selectedMemeData.id) {
      alert("Selecione um meme para atualizar");
    }
    return;
  }

  return (
    <div className="flex flex-col justify-start items-center py-[10dvh] px-[10dvw] bg-sky-500 h-full w-full min-h-[100dvh]">
      <h1 className="uppercase w-full text-center text-5xl text-slate-200">Selecione um meme</h1>
      <img src="/meme-logo-removebg-preview.png" alt="Meme Logo" />

      <div className="flex gap-4">
        <Link className="text-sky-900 w-[200px] text-center p-4 bg-slate-300 rounded-xl" to="/home">
          Voltar
        </Link>
        <Form method="put" onSubmit={handleUpdate}>
          <input type="hidden" name="memeId" value={selectedMemeData.id} />
          <input type="hidden" name="memeLink" value={selectedMemeData.link} />
          <input type="hidden" name="memeType" value={selectedMemeData.type} />
          <button className="text-sky-900 w-[200px] text-center p-4 bg-slate-300 rounded-xl" type="submit">
            Alterar Tipo
          </button>
        </Form>
      </div>

      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}

      <div className="w-full flex gap-4 flex-wrap justify-center items-center mt-8">
        {memes.map((meme, i) => (
          <div key={meme.id} onClick={() => setSelectedMemeData({id: meme.id, link: meme.link, type: meme.type})}>
            <MemeBlock key={i} link={meme.link} type={meme.type} selected={meme.id === selectedMemeData.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
