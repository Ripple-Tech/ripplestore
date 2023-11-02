'use client'

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface inputProps{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>
  errors: FieldErrors

}

const Input: React.FC<inputProps> = ({
    id, label, type, disabled, required, register, errors
}) => {
  return (
    <div className="w-full relative">
      <input
      autoComplete="off"
      id={id}
      disabled={disabled}
      {...register(id, {required})}
      placeholder=""
      type={type} 
      className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 
      rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
      ${errors[id]? 'focus:border-rose-400' : 'focus:border-green-300'}
      `}
      />
      <label htmlFor={id}
      className={`absolute cursor-text tect-md duration-150 transform
      -trangreen-y-3 top-5 z-10 origin-[0] left-4 
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:trangreen-y-0 peer-focus:scale-75 peer-focus:-trangreen-y-4
      ${errors[id]? 'text-rose-500' : 'text-green-400'}
      
      `}
      >{label}</label>
    </div>
  )
}

export default Input