import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { PUBLIC_API } from "~/utils/constants";
import { useToken } from "~/contexts/AuthContext";
import { parse } from "cookie";
import MemeBlock from "~/components/memeBlock";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Meus Memes", content: "Saved_memes_page" },
  ];
};

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

  const navigate = useNavigate()
  useEffect(() => {
    if(!token) {
      navigate("/")
      return
    }
  },[])

  return (
    <div className="flex flex-col justify-start items-center py-[10dvh] px-[10dvw] bg-sky-500 h-full w-full">
        <img src="/meme-logo-removebg-preview.png"/>

      <Link className="text-sky-900 w-[200px] text-center p-4 bg-slate-300 rounded-xl" to="/home">
        Voltar
      </Link>

      <div className="w-full flex gap-4 flex-wrap justify-center items-center mt-8">
      {memes.map((meme, i)=>{
            return(
              <div>
                <MemeBlock key={i} link={meme.link} type={meme.type} selected={false}/>
              </div>
            )
        })}
      </div>
    </div>
  )
}
