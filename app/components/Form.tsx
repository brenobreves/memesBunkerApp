import React, { PropsWithChildren } from "react";

type FormProps = {
    handlerFunction:  React.FormEventHandler<HTMLFormElement>
}

export default function Form({handlerFunction , ...props}: PropsWithChildren<FormProps>){
    return(
        <form className="bg-sky-700 flex flex-col gap-4 p-4 rounded-lg max-w-[700px] mb-4" onSubmit={handlerFunction}>
            {props.children}
        </form>
    )
}