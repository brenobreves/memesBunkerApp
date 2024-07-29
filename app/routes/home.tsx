import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import HomeLink from "~/components/HomeLink";
import { useToken } from "~/contexts/AuthContext";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Home", content: "Home page" },
  ];
};

export default function HomePage() {
  const navigate = useNavigate()
  const { token } = useToken()

  useEffect(() => {
    if(!token) navigate("/")
  },[])

  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-full w-full">
      <h1 className="uppercase w-full text-center text-5xl text-slate-200">HOME</h1>
      <img src="/meme-logo-removebg-preview.png"/>
      <div className="flex gap-8 p-8 bg-slate-200 rounded-3xl flex-wrap w-full lg:w-[50%] h-full">
        <HomeLink to="/create">
          Salvar novo meme
        </HomeLink>
        <HomeLink to="/read">
          Memes salvos
        </HomeLink>
        <HomeLink to="/update">
          Atualizar meme
        </HomeLink>
        <HomeLink to="/delete">
          Remover meme
        </HomeLink>
      </div>
    </div>
  )
}
