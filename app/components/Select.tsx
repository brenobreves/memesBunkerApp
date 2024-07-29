import React, { PropsWithChildren, PropsWithoutRef } from "react";

type InputProps = {
    name: string
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export default function Select({name, onChange, children}: PropsWithChildren<InputProps>){
    return(
        <select className="rounded-md pl-2 text-slate-400" name={name} onChange={onChange} required>
            { children }
        </select>
    )
}