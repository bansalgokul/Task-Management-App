import { useState } from "react";
import ListView from "./ListView";
import { AiOutlinePlus } from "react-icons/ai";
import NewTaskPopup from "./NewTaskPopup";
import { Priority, Task } from "../MainView";

type Props = {
	taskList: Task[];
	setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
	priorityList: Priority[];
};

const TaskView = ({ taskList, setTaskList, priorityList }: Props) => {
	const [isNewTaskPopupOpen, setIsNewTaskPopupOpen] = useState(false);

	const closePopup = () => {
		setIsNewTaskPopupOpen(false);
	};
	const openPopup = () => {
		setIsNewTaskPopupOpen(true);
	};

	return (
		<div className='w-full h-full pt-16'>
			<div className='px-6 fixed z-10 top-20 w-full flex justify-end'>
				<div className=''>
					<button
						onClick={openPopup}
						className='flex px-4 py-2 shadow-sm shadow-black active:shadow-none transition-all bg-[#ececec] rounded-md gap-1 items-center'>
						<AiOutlinePlus />
						Task
					</button>
				</div>
			</div>
			<div className='w-full relative h-full overflow-auto no-scrollbar p-8 flex flex-wrap justify-between content-start gap-6'>
				{priorityList.map((p: Priority) => {
					return (
						<ListView
							key={p._id}
							priority={p}
							priorityList={priorityList}
							taskList={taskList}
							setTaskList={setTaskList}
						/>
					);
				})}
			</div>
			{isNewTaskPopupOpen && (
				<NewTaskPopup
					closePopup={closePopup}
					priorityList={priorityList}
					setTaskList={setTaskList}
					taskList={taskList}
				/>
			)}
		</div>
	);
};

export default TaskView;
