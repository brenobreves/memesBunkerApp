import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import HomeLink from "~/components/HomeLink";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Home", content: "Home page" },
  ];
};

export default function HomePage() {

  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
      <img src="/meme-logo-removebg-preview.png"/>
      <div className="flex gap-8 p-8 bg-slate-200 rounded-3xl">
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
