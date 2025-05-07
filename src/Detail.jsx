import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { SocketContext } from "./socket-context";
import { useNavigate } from "react-router-dom";

const Detail = () => {

    const navigate = useNavigate();
    const socket = useContext(SocketContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        socket.emit('newPlayer', { name: data.name, room: data.room.trim() })

        navigate(`/home/${data.room.trim()}`);


        alert(`Hello, ${data.name}!`);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Enter Your Details</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </label>
                    <input
                        id="name"
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                            },
                            maxLength: {
                                value: 50,
                                message: "Name must be less than 50 characters",
                            },
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                            }`}
                        placeholder="John Doe"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Room Name
                    </label>
                    <input
                        id="room"
                        {...register("room", {
                            required: "Room is required",
                            minLength: {
                                value: 2,
                                message: "Room must be at least 2 characters",
                            },
                            maxLength: {
                                value: 50,
                                message: "Room must be less than 50 characters",
                            },
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                            }`}
                        placeholder="Hello"
                    />
                    {errors.room && (
                        <p className="mt-1 text-sm text-red-600">{errors.room.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Detail;