import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import api from "../../api/api";
import { Priority } from "../MainView";

type Props = {
	handleClose: () => void;
	priorityList: Priority[];
	setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
};

const PriorityPopup = ({
	handleClose,
	priorityList,
	setPriorityList,
}: Props) => {
	const [priority, setPriority] = useState("");

	const onCancel = () => {
		handleClose();
	};
	const onNew = async () => {
		const newPriority = {
			priority: priority,
		};

		const response = await api.post("/priority", newPriority);
		console.log("New Priority Response - ", response.data);

		if (response.status === 201) {
			setPriorityList([...priorityList, response.data]);
		}

		handleClose();
	};

	useEffect(() => {
		ref.current?.focus();
	}, []);

	const ref = useRef<HTMLInputElement>(null);

	return (
		<div className='w-full h-full top-0 left-0 fixed z-20 grid place-content-center bg-[#00000077]'>
			<div className=' relative items-center flex flex-col justify-end bg-white rounded-lg p-4 gap-4'>
				<div onClick={onCancel} className='absolute top-4 right-4'>
					<GrClose />
				</div>
				<input
					className='rounded-md px-3 py-2 bg-opacity-50 bg-[#e0e0e0] mt-8 font-semibold'
					type='text'
					placeholder='Add Priority'
					ref={ref}
					onChange={(e) => setPriority(e.target.value)}
				/>
				<button
					className='py-1 px-4 rounded-md shadow-sm shadow-black
					  bg-red-800 text-white active:shadow-none'
					onClick={onNew}>
					Add
				</button>
			</div>
		</div>
	);
};

export default PriorityPopup;
