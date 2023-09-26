import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input( props: InputProps) {
    return(
        <input 
            style={{ backgroundColor: 'transparent', borderRadius: '48px' }}
            className="text-base text-[#292929] md:text-md flex items-center font-semibold mb-2 w-full h-12 px-8 border border-solid border-[#292929] cursor-pointer text-left flex items-center"
            {...props}
        />
    )
}