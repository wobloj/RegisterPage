import {FC, InputHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name:string;
    label:string;
    type:string;
    placeholder:string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input:FC<InputProps> = ({name, label, type, placeholder, onChange, value, ...rest}) => {

  return (
    <div className='flex flex-col gap-1'>
        <label 
        htmlFor={name} 
        className="text-sm font-bold">
          {label}
        </label>

        <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className={`outline-0 border-3 text-indigo-700 transition-colors duration-200 border-indigo-300 bg-white focus:border-indigo-500 rounded-md p-2 w-64 ${rest}`}/>
    </div>
  )
}
