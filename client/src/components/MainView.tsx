import Header from "./Header";
import TaskView from "./task/TaskView";
import PriorityView from "./priority/PriorityView";
import { Route, Routes } from "react-router-dom";

import Login from "./login/Login";

import Register from "./login/Register";
import { useEffect, useState } from "react";
import api from "../api/api";
import Protected from "./Protected";

export type Task = {
	title: string;
	description: string;
	priority: string;
	_id: string;
	completed: boolean;
};
export type Priority = {
	priority: string;
	user: string;
	_id: string;
};

const MainView = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const token = localStorage.getItem("token")?.replace(/"/g, "");
		if (token) {
			api.defaults.headers.common["authorization"] = `Bearer ${token}`;
			return true;
		}
		return false;
	});

	const [taskList, setTaskList] = useState<Task[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get("/task");
				if (response.status === 200) {
					setTaskList(response.data);
				}
			} catch (error) {
				console.error("Error fetching task list:", error);
			}
		};

		if (isLoggedIn) {
			fetchData();
		}
	}, [isLoggedIn]);

	const [priorityList, setPriorityList] = useState<Priority[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get("/priority");
				if (response.status === 200) {
					setPriorityList(response.data);
				}
			} catch (error) {
				console.error("Error fetching priority list:", error);
			}
		};

		if (isLoggedIn) {
			fetchData();
		}
	}, [isLoggedIn]);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<>
			<Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
			<Routes>
				<Route
					path='login'
					element={<Login handleLogin={handleLogin} />}
				/>
				<Route path='register' element={<Register />} />
				<Route path='/' element={<Protected isLoggedIn={isLoggedIn} />}>
					<Route
						index
						element={
							<TaskView
								taskList={taskList}
								setTaskList={setTaskList}
								priorityList={priorityList}
							/>
						}
					/>
					<Route
						path='priority'
						element={
							<PriorityView
								priorityList={priorityList}
								setPriorityList={setPriorityList}
							/>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default MainView;
