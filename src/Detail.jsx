import { useContext } from "react";
import { useForm } from "react-hook-form";
import { SocketContext } from "./socket-context";
import { useNavigate } from "react-router-dom";
import { Keyboard, Hash, User } from "lucide-react";

const Detail = () => {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        socket.emit('newPlayer', { name: data.name, room: data.room.trim() });
        navigate(`/home/${data.room.trim()}`);
        alert(`Hello, ${data.name}!`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className='w-full flex justify-between bg-white h-15 items-center shadow-md px-10 py-3'>
                <div className='flex flex-row items-center'>
                    <Keyboard size={40} className='text-indigo-600 mr-3' />
                    <h1 className='font-bold text-xl'>Type<span className='text-indigo-600'>Racer</span></h1>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Enter Your Details</h2>

                    <p className="text-sm text-gray-600 mb-6 text-center">
                        Please enter the Room ID you would like to join. If the specified Room ID does not exist, a new room will automatically be created using that ID.
                    </p>

                    <div className="mb-4">
                        <div className="flex flex-row items-center">
                            <User size={20} className="mr-1 text-indigo-600" />
                            <label className="block text-indigo-600 font-semibold mb-1">Your Name</label>
                        </div>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-row items-center">
                            <Hash size={20} className="mr-1 text-indigo-600" />
                            <label className="block text-indigo-600 font-semibold mb-1">Room ID</label>
                        </div>
                        <input
                            type="text"
                            {...register("room", { required: "Room name is required" })}
                            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                        />
                        {errors.room && <p className="text-red-600 text-sm mt-1">{errors.room.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:scale-105 transition-transform duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Detail;