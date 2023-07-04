import { useEffect, useState } from "react";
import PriorityBox from "./PriorityBox";
import { AiOutlinePlus } from "react-icons/ai";
import PriorityPopup from "./PriorityPopup";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Priority } from "../MainView";

type Props = {
	setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
	priorityList: Priority[];
};

const PriorityView = ({ priorityList, setPriorityList }: Props) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleClose = () => {
		setIsPopupOpen(false);
	};

	const [isExpanded, setIsExpanded] = useState(false);
	const [priorityCount, setPriorityCount] = useState(0);

	const handleToggleExpand = () => {
		setIsExpanded((prev) => !prev);
	};

	useEffect(() => {
		setPriorityCount(priorityList.length);
	}, [priorityList]);

	return (
		<div className='w-full h-full pt-16'>
			<div className='px-6 fixed z-10 top-20 w-full flex justify-end'>
				<div className=''>
					<button
						onClick={() => setIsPopupOpen(true)}
						className='flex px-4 py-2 shadow-sm shadow-black active:shadow-none transition-all bg-[#ececec] rounded-md gap-1 items-center'>
						<AiOutlinePlus />
						Priority
					</button>
				</div>
			</div>
			<div className='w-full relative h-full overflow-auto no-scrollbar p-8 flex flex-wrap gap-6'>
				<div className='h-fit flex flex-col p-4 rounded-xl lg:w-1/4 bg-[#f0f0f0]'>
					<div
						onClick={handleToggleExpand}
						className='flex items-center justify-between font-semiboldrounded-lg text-xl min-w-[200px]'>
						<h2>Priority</h2>
						<div className='flex items-center gap-4'>
							({priorityCount})
							{isExpanded ? <BsChevronUp /> : <BsChevronDown />}
						</div>
					</div>
					{isExpanded && (
						<div className='mt-4'>
							{priorityList.sort().map((p) => {
								return (
									<div key={p._id}>
										<PriorityBox
											priority={p}
											priorityList={priorityList}
											setPriorityList={setPriorityList}
										/>
									</div>
								);
							})}
						</div>
					)}
					{isPopupOpen && (
						<PriorityPopup
							handleClose={handleClose}
							setPriorityList={setPriorityList}
							priorityList={priorityList}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default PriorityView;
