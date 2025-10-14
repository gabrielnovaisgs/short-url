"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
	email: z.string().email({ message: "Email inválido" }),
	password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export default function LoginPage() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	function onSubmit(data: any) {
		setLoading(true);
		setError("");
		// Simulação de login
		setTimeout(() => {
			setLoading(false);
			if (data.email !== "demo@email.com" || data.password !== "123456") {
				setError("Email ou senha inválidos");
			} else {
				// Redirecionar ou mostrar sucesso
				alert("Login realizado com sucesso!");
			}
		}, 1200);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Entrar na sua conta</CardTitle>
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
							<Input id="password" type="password" autoComplete="current-password" {...register("password")}/>
							{errors.password && <span className="text-xs text-red-500">{errors.password.message as string}</span>}
						</div>
						{error && <div className="text-sm text-red-600 text-center">{error}</div>}
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Entrando..." : "Entrar"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
