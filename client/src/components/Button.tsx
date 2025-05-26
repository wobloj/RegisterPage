import {ButtonHTMLAttributes, FC} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    disabled:boolean;
    text:string;
    type:"submit" | "reset" | "button" | undefined;
    className?: string;
}

export const Button: FC<ButtonProps> = ({text, type, disabled, className, ...rest}) => {
  return (
    <button
      {...rest}
      type={type} 
      disabled={disabled} 
      className={`${className || ''} py-1 px-6 my-5 cursor-pointer whitespace-nowrap transition-colors duration-200 border-2 border-white hover:border-indigo-300 rounded-md disabled:bg-indigo-200 disabled:border-indigo-200 disabled:cursor-default `}>
        {text}
    </button>
  )
}
