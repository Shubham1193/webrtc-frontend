// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import styled from "styled-components";
// import { useParams, useLocation } from "react-router-dom";
// // import Editor from "./Editor";
// import Editor from "@monaco-editor/react";
// import axios from 'axios'
// import Navbar from "./Navbar";



// const Video = (props) => {
//   const ref = useRef();

//   useEffect(() => {
//     props.peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, []);

//   return (
//     <video
//       style={{ width: "96%", height: "30%", border: "2px solid black" }}
//       playsInline
//       autoPlay
//       ref={ref}
//     />
//   );
// };

// const videoConstraints = {
//   height: window.innerHeight / 2,
//   width: window.innerWidth / 2,
// };

// const Room = (props) => {
//   const location = useLocation();
//   const { id } = location.state || {};
  

//     // State variable to set editors default language
//     const [userLang, setUserLang] = useState("python");

//     // State variable to set editors default theme
//     const [userTheme, setUserTheme] = useState("vs-dark");

//     // State variable to set editors default font size
//     const [fontSize, setFontSize] = useState(20);

//     // State variable to set users input
//     const [userInput, setUserInput] = useState("");

//     // State variable to set users output
//     const [userOutput, setUserOutput] = useState("");

//     // Loading state variable to show spinner
//     // while fetching data
//     const [loading, setLoading] = useState(false);

//     const options = {
//         fontSize: fontSize,

//     }
//   // console.log(id)

//   // if (!id) {
//   //     return <div>Error: No room ID provided</div>;
//   // }
//   const [peers, setPeers] = useState([]);
//   const socketRef = useRef();
//   const userVideo = useRef();
//   const peersRef = useRef([]);
//   const [code, setCode] = useState("hello world");
//   const [result  , setResult] = useState({})
//   // const {id} = id;

//   useEffect(() => {
//     socketRef.current = io.connect("http://localhost:8000");
//     console.log(id);
//     navigator.mediaDevices
//       .getUserMedia({ video: videoConstraints, audio: true })
//       .then((stream) => {
//         userVideo.current.srcObject = stream;
//         socketRef.current.emit("join room", id);
//         socketRef.current.on("all users", (users) => {
//           console.log(users);
//           const peers = [];
//           users.forEach((userID) => {
//             const peer = createPeer(userID, socketRef.current.id, stream);
//             peersRef.current.push({
//               peerID: userID,
//               peer,
//             });
//             const peerObj = {
//               peer,
//               peerID: userID,
//             };
//             peers.push(peerObj);
//           });
//           setPeers(peers);
//         });

//         socketRef.current.on("user joined", (payload) => {
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({
//             peerID: payload.callerID,
//             peer,
//           });
//           const peerObj = {
//             peer,
//             peerID: payload.callerID,
//           };

//           setPeers((users) => [...users, peerObj]);
//         });

//         socketRef.current.on("receiving returned signal", (payload) => {
//         //   console.log("df");
//           const item = peersRef.current.find((p) => p.peerID === payload.id);
//           item.peer.signal(payload.signal);
//         });

//         socketRef.current.on("user-left", (id) => {
//           let peerObj = peersRef.current.find((p) => p.peeID === id);
//           if (peerObj) {
//             peerObj.peer.destroy();
//           }
//           const peers = peersRef.current.filter((p) => p.peerID !== id);
//           setPeers(peers);
//         });

//         socketRef.current.on("room full", () => {
//           // alert("room is full")
//         });
//       });
//     const handleUpdatedCode = (code) => {
//       setCode(code);
//       console.log(code);
//     };

//     const handleCodeResult = (result) => {
//        console.log(result)
//        setResult(result)
//       //  alert(result.output)
//     }

//     socketRef.current.on("updated-code", handleUpdatedCode);

//     socketRef.current.on('code-result' , handleCodeResult)

//     // Clean up the event listener on component unmount
//     return () => {
//       socketRef.current.off('code-result' , handleCodeResult)
//       socketRef.current.off("updated-code", handleUpdatedCode);
//     };

//     // socketRef.current.on("updated-code" , (code) => {
//     //   setCode(code)
//     // })
//   }, []);

//   function createPeer(userToSignal, callerID, stream) {
//     console.log("calling browser");
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//       config: {
//         iceServers: [
//           {
//             urls: "stun:numb.viagenie.ca",
//             username: "sultan1640@gmail.com",
//             credential: "98376683",
//           },
//           {
//             urls: "turn:numb.viagenie.ca",
//             username: "sultan1640@gmail.com",
//             credential: "98376683",
//           },
//         ],
//       },
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("sending signal", {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });

//     return peer;
//   }

//   function addPeer(incomingSignal, callerID, stream) {
//     console.log("incoming from :  ", callerID);
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//       config: {
//         iceServers: [
//           {
//             urls: "stun:numb.viagenie.ca",
//             username: "sultan1640@gmail.com",
//             credential: "98376683",
//           },
//           {
//             urls: "turn:numb.viagenie.ca",
//             username: "sultan1640@gmail.com",
//             credential: "98376683",
//           },
//         ],
//       },
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("returning signal", { signal, callerID });
//     });

//     peer.signal(incomingSignal);

//     return peer;
//   }

//   // const handleCodeChange = (e) => {
//   //   const newCode = e.target.value
//   //   setCode(newCode)
//   //   socketRef.current.emit("update-code" , {code , id})
//   // }

//   // useEffect (() => {
//   //   socketRef.current.on("updated-code" , (code) => {
//   //     setCode(code)
//   //     console.log(code)
//   //   })
//   // })

//   const handleCodeChange = (value) => {
//     console.log(value)
//     const newCode = value;
//     setCode(newCode);
//     socketRef.current.emit("update-code", { code: newCode, id });
//   };

// //   const handleSubmit = async() => {
// //     const data = {'code' : code , 'language' : 'py'}
// //     const res = await axios.post("http://localhost:8000/submit" , data)
// //     console.log(res.data)
// //   }
// const handleSubmit = async () => {
    
//     // const code = code// Access your code value here (e.g., from a text area or editor)
//     const data = {   code , userLang , id , userInput}; // Create object with code and language
  
//     try {
//       const response = await axios.post('http://localhost:8000/submit', data); // Send POST request with data
//       // console.log(response.data); // Log the response data
//     } catch (error) {
//       console.error(error); // Log any errors
//       // Handle errors gracefully (e.g., display an error message to the user)
//     }
//     // console.log(data)
//   //  
//   };

//   return (
//     <div>
//       <div className="h-[6vh] bg-[#474747] "><Navbar
//                 userLang={userLang} setUserLang={setUserLang}
//                 userTheme={userTheme} setUserTheme={setUserTheme}
//                 fontSize={fontSize} setFontSize={setFontSize} submit = {handleSubmit}
//             /></div>
            
//       <div className="flex w-[100vw] h-[94vh]">
//         <div className=" w-[75%] h-[100%] ">
//           <div className="h-[80%]">
//           <Editor
//                         options={options}
//                         height="100%"
//                         width="100%"
//                         theme={userTheme}
//                         language={userLang}
//                         defaultLanguage="python"
//                         defaultValue=""
//                         onChange={handleCodeChange}
//                         value={code}
//                     />
//             <button className="w-[20%] border-2 p-2 bg-slate-400" onClick={handleSubmit}>run</button>
//           </div>
//           <div className="h-[18%] bg-black text-white flex">
//             <div className="w-[50%] border-2 bg-[#474747]"><textarea  className="bg-[#474747] w-[100%] h-[100%] text-white" onChange=
//                             {(e) => setUserInput(e.target.value)}>
//                         </textarea>
//             </div>
//             <div className="w-[50%] border-2 bg-[#474747] p-2">{result.output}
                       
//             </div>
           
//           </div>
//         </div>

//         <div style={{ width: "25%", border: "2px solid black" }}>
//           <video
//             style={{ width: "96%", height: "30%", border: "2px solid black" }}
//             muted
//             ref={userVideo}
//             autoPlay
//             playsInline
//           />
//           {peers.map((peer) => {
//             return <Video key={peer.peerID} peer={peer.peer} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Room;

