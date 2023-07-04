import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

type Props = {
	handleLogin: () => void;
};

const Login = ({ handleLogin }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		const response = await api.post("/login", userData);

		if (response.statusText === "OK") {
			const { token } = response.data;
			localStorage.setItem("token", JSON.stringify(token));
			api.defaults.headers.common["authorization"] = `Bearer ${token}`;
			handleLogin();
			navigate("/");
		}
	};

	return (
		<div className='w-full h-full grid place-content-center'>
			<div className='bg-white shadow-sm rounded-md  border-[1px] border-[#d5d4d4] shadow-[#898888] p-4 w-[300px]'>
				<h1 className='text-2xl font-bold text-center mb-2'>Login</h1>
				<form
					action=''
					className='flex flex-col items-center'
					onSubmit={onLogin}>
					<input
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						className='border-[#d5d4d4] px-2 py-1 w-full text-black bg-[#fafafa] active:bg-[#fafafa] rounded-md my-1 border-2'
					/>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						className='border-[#d5d4d4] px-2 py-1 w-full text-black bg-[#fafafa] active:bg-[#fafafa] rounded-md my-1 border-2'
					/>
					<button
						type='submit'
						className='bg-red-800 text-white font-semibold text-base rounded-md px-4 py-1 w-full my-2'>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
