import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import Form from "~/components/Form";
import Input from "~/components/Input";
import { PUBLIC_API } from "~/utils/constants";

export const meta: MetaFunction = () => {
  return [
    { title: "memesBunker" },
    { name: "Home", content: "Home page" },
  ];
};

export default function HomePage() {

  return (
    <div className="flex flex-col justify-center items-center py-[10dvh] px-[10dvw] bg-sky-500 h-[100dvh] w-[100dvw]">
        HOME PAGE
    </div>
  )
}
