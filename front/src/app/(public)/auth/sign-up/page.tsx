"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const registerSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    function onSubmit(data: RegisterFormValues) {
        setLoading(true);
        setError("");
        // Simulação de cadastro
        setTimeout(() => {
            setLoading(false);
            if (data.email === "demo@email.com") {
                setError("Este email já está em uso");
            } else {
                alert("Cadastro realizado com sucesso!");
            }
        }, 1200);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Criar nova conta</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <Input id="email" type="email" autoComplete="email" {...register("email")}/>
                            {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                            <Input id="password" type="password" autoComplete="new-password" {...register("password")}/>
                            {errors.password && <span className="text-xs text-red-500">{errors.password.message as string}</span>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirmar Senha</label>
                            <Input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword")}/>
                            {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message as string}</span>}
                        </div>
                        {error && <div className="text-sm text-red-600 text-center">{error}</div>}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}