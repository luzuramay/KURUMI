import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch("http://localhost:3000/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		if (res.ok) {
			history.push("/game");
		} else {
			const data = await res.json();
			setMessage(data.message || "Falha no login");
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center
                    bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4"
		>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-6 rounded-lg shadow-md backdrop-blur-sm text-white"
				style={{ backgroundColor: "rgba(54, 54, 54, 0.1)" }}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				{message && <p className="text-red-400 mb-4 text-sm">{message}</p>}
				<input
					className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
					type="email"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					required
				/>
				<div className="relative mb-6">
					<input
						className="w-full p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
						type={showPassword ? "text" : "password"}
						placeholder="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
						required
					/>
					<button
						type="button"
						className="absolute inset-y-0 right-0 flex items-center pr-3"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeSlashIcon className="h-5 w-5 text-gray-400" />
						) : (
							<EyeIcon className="h-5 w-5 text-gray-400" />
						)}
					</button>
				</div>
				<button
					type="submit"
					className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded"
				>
					Login
				</button>
				<p className="text-sm text-center mt-4">
					Não tem uma conta?{" "}
					<Link to="/register" className="text-red-400 hover:underline">
						Cadastre-se
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
