import { Link } from "@remix-run/react";
import { PropsWithChildren } from "react";

type HomeLinkProps = {
    to: string
}

export default function HomeLink({to, children}: PropsWithChildren<HomeLinkProps>) {

  return (
    <Link to={to} className="w-full h-40 py-[5%] px-8 bg-sky-950 text-slate-300 rounded-3xl flex justify-center items-center text-center">
        {children}
    </Link>
  )
}