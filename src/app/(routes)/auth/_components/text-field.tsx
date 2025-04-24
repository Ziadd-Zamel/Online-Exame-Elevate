import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  autoComplete?: string;
}

const TextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  placeholder,
  autoComplete,
}: TextFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={`  rounded-lg h-14 placeholder:text-neutralGray bg-lightGray shadow-secondary ${
                fieldState.error
                  ? 'border-red-600 focus:border-none'
                  : 'border-borderGray'
              }`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
