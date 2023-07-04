import { useState, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import api from "../../api/api";
import { Priority, Task } from "../MainView";

type TaskPopupProps = {
	task: Task;
	closeEditTaskPopup: () => void;
	taskList: Task[];
	setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
	priorityList: Priority[];
};

const EditTaskPopup = ({
	task,
	closeEditTaskPopup,
	taskList,
	setTaskList,
	priorityList,
}: TaskPopupProps) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [priority, setPriority] = useState(task.priority);

	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPriority(e.target.value);
	};
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setDescription(e.target.value);
	};
	const handleCancel = () => {
		closeEditTaskPopup();
	};

	const handleUpdateTask = async () => {
		const updatedTask = {
			title,
			priority,
			description,
			completed: task.completed,
		};

		const result = await api.put("/task", {
			_id: task._id,
			...updatedTask,
		});
		if (result.statusText === "OK") {
			const updatedTaskList = taskList.map((t: Task) => {
				if (t._id === task._id) {
					return result.data;
				} else {
					return t;
				}
			});
			setTaskList(updatedTaskList);
		}
		console.log("Update task response - ", result.data);

		closeEditTaskPopup();
	};

	useEffect(() => {
		ref.current?.focus();
	}, []);

	const ref = useRef<HTMLInputElement>(null);

	return (
		<div className='w-full h-full top-0 left-0 fixed z-20 grid place-content-center bg-[#00000077]'>
			<div className='w-[300px] h-[400px] flex relative flex-col rounded-xl bg-[#ebe7e7] shadow-lg shadow-neutral-900'>
				<div
					className='w-8 h-8 absolute right-4 top-6 text-2xl'
					onClick={handleCancel}>
					<GrClose />
				</div>
				<h2 className='p-4 pb-0 text-4xl text-center font-bold'>
					Edit Task
				</h2>

				<div className='flex flex-col flex-grow p-4 pt-0'>
					<div className='flex-grow m-1'>
						<div className='flex flex-col my-2'>
							<label htmlFor='title'>Title : </label>
							<input
								type='text'
								name='title'
								id='title'
								value={title}
								onChange={handleTitleChange}
								className='text-black rounded-lg p-1 my-2'
								required
								ref={ref}
							/>
						</div>
						<div className='flex flex-col my-2'>
							<label htmlFor='description'>Description :</label>
							<textarea
								name='description'
								id='description'
								value={description}
								onChange={handleDescriptionChange}
								className='text-black rounded-lg border-2 p-1 my-2 '
							/>
						</div>
						<div className='flex flex-col my-2'>
							<label htmlFor='priority'>Priority :</label>
							<select
								name='priority'
								id='priority'
								onChange={handlePriorityChange}
								value={priority}
								className='text-black border-2 p-1 my-2 rounded-lg'>
								{priorityList.map((p) => {
									return (
										<option key={p._id} value={p._id}>
											{p.priority}
										</option>
									);
								})}
							</select>
						</div>
					</div>

					<div className='flex justify-end'>
						<button
							onClick={handleCancel}
							className='py-1 px-4 bg-red-500 text-white rounded-md m-2'>
							Cancel
						</button>
						<button
							onClick={handleUpdateTask}
							className='py-1 px-4 bg-red-500 text-white rounded-md m-2'>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTaskPopup;
