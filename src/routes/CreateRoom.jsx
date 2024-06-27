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
        <div>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter room code to create" 
                    value={createRoomCode}
                    onChange={(e) => setCreateRoomCode(e.target.value)}
                />
                <button onClick={createRoom}>Create Room</button>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter room code to join" 
                    value={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value)}
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    );
};

export default CreateRoom;
