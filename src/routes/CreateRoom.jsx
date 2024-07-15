// src/components/CreateRoom.js
import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setRoomId } from '../redux/room/roomSlice';
import { clearRoomId } from '../redux/room/roomSlice';
import { clearPeerState } from '../redux/peer/peerSlice';


const CreateRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createRoomCode, setCreateRoomCode] = useState("");
    const [joinRoomCode, setJoinRoomCode] = useState("");


    useEffect(() => {
        dispatch(clearPeerState())
        dispatch(clearRoomId());
    })

    function createRoom() {
        if (createRoomCode) {
            dispatch(setRoomId(createRoomCode));
            navigate("/room");
        } else {
            alert("Please enter a room code to create.");
        }
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
        <div className="w-[100%] h-screen flex flex-col items-center bg-[#363738] text-white">
            <div className="border-2 mt-10 p-5 rounded-xl w-[40%] text-center">
                <p className="text-2xl">SyncCode</p>
            </div>
            <div className="w-[30%] border-2 mt-8 rounded-2xl">
                <div className="w-[100%] p-10 flex  justify-center">
                    <input
                        type="text"
                        className="border-2 w-full border-black p-3 rounded-lg text-black text-xl"
                        placeholder="Enter room code to create"
                        value={createRoomCode}
                        onChange={(e) => setCreateRoomCode(e.target.value)}
                    />
                    <button className="ml-1 w-[50%] border-2 rounded-lg border-black bg-[#495f7b]" onClick={createRoom}>
                        Create Room
                    </button>
                </div>
                <div className="w-[100%] p-10 flex  justify-center ">
                    <input
                        type="text"
                        placeholder="Enter room code to join"
                        className="border-2 border-black w-full p-3 text-xl rounded-lg text-black"
                        value={joinRoomCode}
                        onChange={(e) => setJoinRoomCode(e.target.value)}
                    />
                    <button className="ml-1 w-[50%] border-2 rounded-lg border-black bg-[#495f7b]" onClick={joinRoom}>
                        Join Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
