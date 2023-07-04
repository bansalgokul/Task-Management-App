import { useEffect, useState } from "react";
import TaskBox from "./TaskBox";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Priority, Task } from "../MainView";

type Props = {
	priority: Priority;
	taskList: Task[];
	setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
	priorityList: Priority[];
};

const ListView = ({ priority, taskList, setTaskList, priorityList }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [taskCount, setTaskCount] = useState(0);

	const handleToggleExpand = () => {
		setIsExpanded((prev) => !prev);
	};

	useEffect(() => {
		setTaskCount(
			taskList.filter((task: Task) => task.priority === priority._id)
				.length,
		);
	}, [taskList]);

	return (
		<>
			{taskList.filter((task: Task) => task.priority === priority._id)
				.length ? (
				<div className='h-fit flex flex-col  rounded-xl md:w-[45%] lg:w-[30%] min-w-[250px] bg-[#f0f0f0]'>
					<div
						onClick={handleToggleExpand}
						className='flex items-center p-4 justify-between font-semiboldrounded-lg text-xl'>
						<h2>{priority.priority}</h2>
						<div className='flex items-center gap-4'>
							({taskCount})
							{isExpanded ? <BsChevronUp /> : <BsChevronDown />}
						</div>
					</div>

					{isExpanded && (
						<div className='p-4 pt-0'>
							{taskList
								.filter(
									(task: Task) =>
										task.priority === priority._id,
								)
								.map((task: Task) => {
									return (
										<TaskBox
											key={task._id}
											task={task}
											taskList={taskList}
											setTaskList={setTaskList}
											priorityList={priorityList}
										/>
									);
								})}
						</div>
					)}
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default ListView;
