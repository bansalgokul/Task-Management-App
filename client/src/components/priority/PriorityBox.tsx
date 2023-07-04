import { AiOutlineDelete } from "react-icons/ai";
import api from "../../api/api";
import { Priority } from "../MainView";

type Props = {
	priority: Priority;
	priorityList: Priority[];
	setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
};

const PriorityBox = ({ priority, priorityList, setPriorityList }: Props) => {
	const handleDelete = async () => {
		const response = await api.delete(`/priority/${priority._id}`);

		console.log("Delete priority response - ", response);

		if (response.statusText === "OK") {
			setPriorityList(
				priorityList.filter((p) => {
					return p._id !== priority._id;
				}),
			);
		}
	};

	return (
		<div className='rounded-md hover:scale-105 shadow-neutral-700 shadow-md flex w-full bg-white justify-between items-center py-2 px-4 my-3 text-xl'>
			<div className='w-2/3 overflow-auto no-scrollbar'>
				{priority.priority}
			</div>
			<div className='cursor-pointer' onClick={handleDelete}>
				<AiOutlineDelete />
			</div>
			{/* <div className='cursor-pointer' onClick={handleEdit}>
				<GrEdit />
			</div> */}
		</div>
	);
};

export default PriorityBox;
