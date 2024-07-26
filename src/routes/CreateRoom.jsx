import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setRoomId } from '../redux/room/roomSlice';
import { clearRoomId } from '../redux/room/roomSlice';
import { clearPeerState } from '../redux/peer/peerSlice';
import { useSocket } from "../context/SocketProvider";
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';
import profile from '../assets/profile.png'
import { useSelector } from "react-redux";
import MainNavbar from "../components/MainNavbar";


const CreateRoom = () => {

    const {currentUser} = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSocket()

    const [joinRoomCode, setJoinRoomCode] = useState("");


    useEffect(() => {
        dispatch(clearPeerState())
        dispatch(clearRoomId());
    })

    // useEffect(()=> {
    //     socket.on('room full' , handleroomfull)
    //     return () => {
    //         socket.off('room full' , handleroomfull)
    //     }
    // })

    // const handleroomfull = () => {
    //     alert("cannot join room is full")
    // }

    function createRoom() {
        const randomroomid = Math.floor(Math.random() * 100000000 + 1).toString();
        dispatch(setRoomId(randomroomid));
        navigate("/room");
    }

    function joinRoom() {
        if (joinRoomCode) {
            dispatch(setRoomId(joinRoomCode));
            navigate("/room");
        } else {
            alert("Please enter a room code to join.");
        }
    }

    return (


        <>

           <MainNavbar/>


            <div className="w-[100%] h-[90vh] flex flex-col items-center  text-white">

                {/* <div className="border-2 mt-10 p-5 rounded-xl w-[40%] text-center">
                    <p className="text-2xl">SyncCode</p>
                </div> */}
                <div className="w-[30%] border-2 mt-12 rounded-2xl border-black">
                    <div className="w-[100%] p-10 flex  justify-center">
                        <button className="ml-1 w-[100%] border-2 rounded-lg border-2 bg-[#03B2F7] h-[60px] text-xl hover:bg-[#3B8EF5]" onClick={createRoom}>
                            Create Room
                        </button>
                    </div>
                    <div className="w-[100%] p-10 flex  justify-center ">
                        <input
                            type="text"
                            placeholder="Enter room code to join"
                            className="border-2 w-full p-3 text-xl rounded-lg text-black"
                            value={joinRoomCode}
                            onChange={(e) => setJoinRoomCode(e.target.value)}
                        />
                        <button className="ml-1 w-[50%] border-2 rounded-lg border--2 bg-[#03B2F7] hover:bg-[#3B8EF5]" onClick={joinRoom}>
                            Join Room
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CreateRoom;
