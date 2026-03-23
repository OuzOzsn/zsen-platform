import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

// ─── Tipler ───────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string; // hook form'dan gelen hata mesajı
}

// ─── Base Input ───────────────────────────────────────────
const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, ...rest }, ref) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} ref={ref} {...rest} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <BaseInput {...props} type="text" ref={ref} />
);

export const MailInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <BaseInput {...props} type="email" ref={ref} />
);

export const NumberInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <BaseInput {...props} type="number" ref={ref} />
);

// ─── Zod Schema ───────────────────────────────────────────
const schema = z.object({
  username: z
    .string()
    .min(3, "En az 3 karakter olmalı")
    .max(20, "En fazla 20 karakter olmalı"),
  email: z
  .email("Geçerli bir email girin"),
  age: z
    .number({ error: "Sayı girin" })
    .min(18, "En az 18 yaşında olmalısınız")
    .max(100, "Geçerli bir yaş girin"),
});

type FormValues = z.infer<typeof schema>;

// ─── Form ─────────────────────────────────────────────────
export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Kullanıcı Adı"
        {...register("username")}
        error={errors.username?.message}
      />
      <MailInput
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <NumberInput
        label="Yaş"
        {...register("age", { valueAsNumber: true })}
        error={errors.age?.message}
      />
      <button type="submit">Gönder</button>
    </form>
  );
}