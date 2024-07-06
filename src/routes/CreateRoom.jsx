import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = (props) => {
    const navigate = useNavigate();
    const [createRoomCode, setCreateRoomCode] = useState("");
    const [joinRoomCode, setJoinRoomCode] = useState("");

    function createRoom() {
        if (createRoomCode) {
            navigate("/room", { state: { id: createRoomCode } });
        } else {
            alert("Please enter a room code to create.");
        }
    }

    function joinRoom() {
        if (joinRoomCode) {
            navigate("/room", { state: { id: joinRoomCode } });
        } else {
            alert("Please enter a room code to join.");
        }
    }

    return (
        <div className="w-[100%] h-screen
         flex flex-col  items-center">
            <div className="border-2  mt-10 p-5 rounded-xl w-[50%] text-center" ><h1>Devfinder</h1></div>
            <div className=" w-[40%] border-2 mt-8 rounded-2xl">
            <div className=" w-[100%]   p-10 flex felx-col justify-center">
                <input 
                    type="text"
                    className="border-2 w-full border-black  p-4 rounded-lg" 
                    placeholder="Enter room code to create" 
                    value={createRoomCode}
                    onChange={(e) => setCreateRoomCode(e.target.value)}
                />
                <button  className="ml-1 w-[50%] border-2 rounded-lg border-black" onClick={createRoom}>Create Room</button>
            </div>

            <div className="  w-[100%]  p-10 flex felx-col justify-center">
                <input 
                    type="text" 
                    placeholder="Enter room code to join" 
                    className="border-2 border-black w-full p-4 rounded-lg"
                    value={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value)}
                />
                <button  className=" ml-1 w-[50%] border-2 rounded-lg border-black" onClick={joinRoom}>Join Room</button>
            </div>
            
            </div>
        </div>
    );
};

export default CreateRoom;
