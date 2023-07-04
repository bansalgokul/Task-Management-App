import { Task } from "../../context/TaskContext";
import { GrClose } from "react-icons/gr";

type TaskPopupProps = {
	task: Task;
	closeViewTaskPopup: () => void;
};

const ViewTaskPopup = ({ task, closeViewTaskPopup }: TaskPopupProps) => {
	return (
		<div className='w-full h-full top-0 left-0 fixed z-20 grid place-content-center bg-[#00000077]'>
			<div className='w-[400px] h-[400px] flex relative flex-col rounded-xl bg-[#ebe7e7] shadow-lg shadow-neutral-900'>
				<div className='grid place-content-center h-1/5'>
					<div
						className='w-8 h-8 absolute right-4 top-6 text-2xl'
						onClick={closeViewTaskPopup}>
						<GrClose />
					</div>
					<h2 className='p-4 pb-0 text-4xl text-center font-bold'>
						Task
					</h2>
				</div>

				<div className='flex-grow flex flex-col m-1 justify-center'>
					<div className='flex flex-col flex-grow p-4 pt-0'>
						<div className='flex-grow m-1'>
							<div className='flex flex-col my-2'>
								<label htmlFor='title'>Title : </label>
								<input
									type='text'
									name='title'
									id='title'
									value={task.title}
									className='text-black rounded-lg p-1 my-2'
								/>
							</div>
							<div className='flex flex-col my-2'>
								<label htmlFor='description'>
									Description :
								</label>
								<textarea
									id='description'
									name='description'
									value={task.description}
									className='text-black rounded-lg border-2 p-1 my-2 '
								/>
							</div>
							<div className='flex flex-col my-2'>
								<label htmlFor='priority'>Priority :</label>
								<select
									disabled
									name='priority'
									id='priority'
									value={task.priority}
									className='text-black border-2 p-1 my-2 rounded-lg'>
									<option selected>{task.priority}</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewTaskPopup;
