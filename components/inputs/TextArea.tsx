'use client'

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface TextAreaProps{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>
  errors: FieldErrors

}

const TextArea: React.FC<TextAreaProps> = ({ 
    id, label,  disabled, required, register, errors
}) => {
  return (
    <div className="w-full relative">
      <textarea
      id={id}
      disabled={disabled}
      {...register(id, {required})}
      placeholder=""
      className={`peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none bg-white font-light border-2 
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

export default TextArea