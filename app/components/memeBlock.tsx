import React, { PropsWithChildren, PropsWithoutRef, useState } from "react";

type MemeBlockProps = {
    link: string
    type: "link" | "image"
    key: number
    selected: boolean
}

export default function MemeBlock({ link, type, key, selected }: PropsWithChildren<MemeBlockProps>) {
    if (selected) {
        return (
            <div key={key} className="bg-slate-300 rounded-3xl flex items-center p-[6px] text-sky-400 border-2 border-sky-900">
                {type === "image" ?
                    <img src={link} className="rounded-3xl" /> :
                    <a href={link} target="_blank">{link}</a>
                }
            </div>
        )
    }
    return (
        <div key={key} className="bg-slate-300 rounded-3xl flex items-center p-2 text-sky-400">
                {type === "image" ?
                    <img src={link} className="rounded-3xl" /> :
                    <a href={link} target="_blank">{link}</a>
                }
            </div>
    )
}