"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"

const schema = z.object({
    email: z.email("Geçerli bir email girin"),
    username: z.string().min(3, "Ad soyad en az 3 karakter olmalı"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    passwordConfirm: z.string(),
}).refine(d => d.password === d.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
})

type FormData = z.infer<typeof schema>

export default function CreateUserPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        console.log(data);
        const res = await fetch(routes.apiRoutes.user.create, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const text = await res.text()
            console.error("Hata:", text)
            return
        }

        console.log("Başarılı", await res.json())
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-2">
                <h1 className="text-xl font-semibold mb-4">Kayıt Ol</h1>

                <FieldGroup className="gap-5">
                    {/* Email */}
                    <Field>
                        <FieldLabel>E-Mail</FieldLabel>
                        <InputGroup className="h-auto">
                            <InputGroupInput placeholder="ornek@mail.com" {...register("email")} />
                            <InputGroupAddon align="block-start">
                                <InputGroupText>E-Mail*</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
                    </Field>

                    {/* Ad Soyad */}
                    <Field>
                        <FieldLabel>Ad Soyad</FieldLabel>
                        <InputGroup className="h-auto">
                            <InputGroupInput placeholder="Tam isminizi girin" {...register("username")} />
                            <InputGroupAddon align="block-start">
                                <InputGroupText>Ad Soyad*</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.username && <FieldDescription className="text-red-500">{errors.username.message}</FieldDescription>}
                    </Field>

                    {/* Şifre */}
                    <Field>
                        <FieldLabel>Şifre</FieldLabel>
                        <InputGroup>
                            <InputGroupInput type="password" placeholder="Şifreniz" {...register("password")} />
                        </InputGroup>
                        {errors.password && <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>}
                    </Field>

                    {/* Şifre Tekrar */}
                    <Field>
                        <FieldLabel>Şifre Tekrar</FieldLabel>
                        <InputGroup>
                            <InputGroupInput type="password" placeholder="Şifrenizi tekrar girin" {...register("passwordConfirm")} />
                        </InputGroup>
                        {errors.passwordConfirm && <FieldDescription className="text-red-500">{errors.passwordConfirm.message}</FieldDescription>}
                    </Field>
                </FieldGroup>

                <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                    {isSubmitting ? "Kaydediliyor..." : "Kayıt Ol"}
                </Button>
            </form>
        </div>
    )
}