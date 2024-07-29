import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Home", content: "Home page" },
  ];
};

export default function createPage() {

  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        CREATE MEME PAGE
    </div>
  )
}