import React from 'react'
import { Controller, Control, Path, FieldValues } from 'react-hook-form'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormFieldProps<T extends FieldValues> {

  control : Control<T>;
  name: Path<T>
  label:string;
  placeholder?: string;
  description?: string;
  type? : 'text' | 'email' | 'password' | 'file' 
}

const FormField = ({control, name, label, placeholder, description, type = "text"} : FormFieldProps<T>) => (
    
    <Controller name = {name} control={control} render={({field}) => (

      <FormItem>
      <FormLabel className ="label">{label}</FormLabel>
      <FormControl>
        <Input className="input" placeholder={placeholder} type={type} {...field} />
      </FormControl>
      <FormDescription className="description">
       {description}
      </FormDescription>
      <FormMessage />
    </FormItem>

    )}
        />
)

export default FormField