import { Navigate, Outlet } from "react-router-dom";

type Props = {
	isLoggedIn: boolean;
};

const Protected = ({ isLoggedIn }: Props) => {
	console.log(isLoggedIn);

	if (!isLoggedIn) return <Navigate to='/login' replace />;

	return (
		<div className='w-full h-full min-h-screen'>
			<Outlet />
		</div>
	);
};

export default Protected;
