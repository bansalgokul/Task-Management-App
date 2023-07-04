import { GrEdit, GrCheckbox } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";

import { useState } from "react";
import EditTaskPopup from "./EditTaskPopup";
import ViewTaskPopup from "./ViewTaskPopup";
import api from "../../api/api";
import { Priority, Task } from "../MainView";

type Props = {
	task: Task;
	taskList: Task[];
	setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
	priorityList: Priority[];
};

const TaskBox = ({ task, taskList, setTaskList, priorityList }: Props) => {
	const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = useState(false);
	const [isViewTaskPopupOpen, setIsViewTaskPopupOpen] = useState(false);

	const handleView = () => {
		setIsViewTaskPopupOpen(true);
		setIsEditTaskPopupOpen(false);
	};

	const handleEdit = () => {
		setIsEditTaskPopupOpen(true);
		setIsViewTaskPopupOpen(false);
	};

	const handleDelete = async () => {
		const response = await api.delete(`task/${task._id}`);

		console.log(response);
		setTaskList(
			taskList.filter((t) => {
				return t._id !== task._id;
			}),
		);
	};

	const handleComplete = async () => {
		const response = await api.put("/task", {
			_id: task._id,
			completed: !task.completed,
		});

		console.log("Completed Task response - ", response.data);

		if (response.status === 200) {
			const updatedTaskList = taskList.map((t) => {
				if (t._id === task._id) {
					return { ...task, completed: !task.completed };
				}
				return t;
			});
			setTaskList(updatedTaskList);
		}
	};

	const closeEditTaskPopup = () => {
		setIsEditTaskPopupOpen(false);
	};
	const closeViewTaskPopup = () => {
		setIsViewTaskPopupOpen(false);
	};

	return (
		<>
			<div className='rounded-md hover:scale-105 shadow-neutral-700 shadow-md flex w-full bg-white justify-between items-center py-2 px-4 my-3 text-xl'>
				{/* <div className='cursor-pointer' onClick={handleView}>
					<GrView />
				</div> */}
				<div className='w-2/3 overflow-hidden' onClick={handleView}>
					{task.title}
				</div>
				<div className='flex gap-3 cu'>
					<div className='cursor-pointer' onClick={handleDelete}>
						<AiOutlineDelete />
					</div>

					{!task.completed && (
						<div className='cursor-pointer' onClick={handleEdit}>
							<GrEdit />
						</div>
					)}

					<div className='cursor-pointer' onClick={handleComplete}>
						{task.completed ? (
							<RiCheckboxCircleFill />
						) : (
							<GrCheckbox />
						)}
					</div>
				</div>
			</div>
			{isEditTaskPopupOpen && (
				<EditTaskPopup
					task={task}
					closeEditTaskPopup={closeEditTaskPopup}
					taskList={taskList}
					setTaskList={setTaskList}
					priorityList={priorityList}
				/>
			)}
			{isViewTaskPopupOpen && (
				<ViewTaskPopup
					task={task}
					closeViewTaskPopup={closeViewTaskPopup}
				/>
			)}
		</>
	);
};

export default TaskBox;
