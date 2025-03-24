import { PasswordInput } from '@/components/common/password-input';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
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

const PasswordField = <
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
            <PasswordInput
              className={`rounded-lg h-14 placeholder:text-neutralGray  bg-lightGray  ${
                fieldState?.error
                  ? 'border-red-600 focus:border-none'
                  : 'border-borderGray shadow-secondary'
              }`}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
