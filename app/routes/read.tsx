import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import Input from "~/components/Input";
import Form from "~/components/Form";
import { PUBLIC_API } from "~/utils/constants";
import Select from "~/components/Select";
import { useToken } from "~/contexts/AuthContext";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Meus Memes", content: "Saved_memes_page" },
  ];
};

export default function SignUpPage() {
  const { token } = useToken()

  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        <img src="/meme-logo-removebg-preview.png"/>

      <Link className="text-sky-900 w-auto text-center p-4 bg-slate-300 rounded-xl" to="/home">
        Voltar
      </Link>
    </div>
  )
}
