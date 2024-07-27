import React, { PropsWithChildren, PropsWithoutRef } from "react";

type InputProps = {
    name: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    placeholder: string
    type: string
}

export default function Input({name, value, onChange, placeholder, type}: PropsWithoutRef<InputProps>){
    return(
        <input className="rounded-md pl-2" name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} required/>
    )
}