import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import { setRoomId } from '../redux/room/roomSlice';
import { clearRoomId } from '../redux/room/roomSlice';
import { setPeerId, setPeerInstance, clearPeerState } from '../redux/peer/peerSlice';
import { useSocket } from '../context/SocketProvider';

const Problems = () => {
  const socket = useSocket()
  const { roomId: id } = useSelector((state) => state.room);
  console.log(id)
  const { peerId, peerInstance } = useSelector((state) => state.peer);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dispatch(clearPeerState())
    socket.emit("disco" , {peerId , token : localStorage.getItem("access_token")})
    // dispatch(clearRoomId());
  })

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/problems"
        );
        console.log(response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="w-[100%]  flex flex-col items-center  bg-[#262626] text-white h-[100vh]">
      <div className="border-2 p-4 text-3xl m-6 rounded-2xl">Problems</div>
      <div className="w-[50%] flex flex-col items-center p-4 rounded-2xl">
        {questions.map((ques, index) => (
          <div key={ques._id || index} className="w-[80%] border-2 p-4 my-2 rounded-xl text-xl flex justify-between items-center " onClick={() => navigate('/room' , {state : {question : ques}})}>
            <h2>{ques.title}</h2>
            {/* <button className=" px-2 py-1 rounded-xl " onClick={() => navigate('/room' , {state : {question : ques}})}>solve</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
