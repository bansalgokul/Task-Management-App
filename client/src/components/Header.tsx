import { Link, useNavigate } from "react-router-dom";

type Props = {
	isLoggedIn: boolean;
	handleLogout: () => void;
};

const Header = ({ isLoggedIn, handleLogout }: Props) => {
	const navigate = useNavigate();

	return (
		<div className='fixed top-0 left-0 w-full flex flex-row justify-between py-4 px-8 items-center text-black bg-[#e0e0e0]'>
			<div className=''>
				<h1 className='font-bold  text-4xl'>Task Management</h1>
			</div>
			<nav className='text-xl flex justify-center'>
				<ul className='flex flex-row gap-8 items-center'>
					{isLoggedIn ? (
						<>
							<li
								onClick={() => {
									localStorage.removeItem("token");
									handleLogout();
									navigate("/");
								}}>
								<button>Logout</button>
							</li>
							<li>
								<Link to={"/"}>Task</Link>
							</li>
							<li>
								<Link to={"/priority"}>Priority</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to={"/register"}>Register</Link>
							</li>
							<li>
								<Link to={"/login"}>Login</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Header;
