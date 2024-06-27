import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams  , useLocation} from "react-router-dom";
import Editor from "./Editor";


const StyledVideo = styled.video`
    height: 60%;
    width: 80%;
    border-radius : 100%;
    margin : 0;
    padding : 0
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video style={{width : "96%" , height : "30%" , border: "2px solid black"}} playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
  const location = useLocation();
  const { id } = location.state || {};
  // console.log(id)

  // if (!id) {
  //     return <div>Error: No room ID provided</div>;
  // }
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [code , setCode] = useState('')
    // const {id} = id;

    useEffect(() => {
        socketRef.current = io.connect("https://webrtc-backend-a67e.onrender.com");
        console.log(id)
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", id);
            socketRef.current.on("all users", users => {
                console.log(users)
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    const peerObj = {
                        peer , 
                        peerID : userID
                    }
                    peers.push(peerObj);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                const peerObj = {
                    peer,
                    peerID : payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                console.log("df")
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on('user-left', id => {
                let peerObj = peersRef.current.find(p => p.peeID === id)
                if (peerObj) {
                    peerObj.peer.destroy()
                }
                const peers = peersRef.current.filter(p => p.peerID !== id)
                setPeers(peers)
            })

           

            socketRef.current.on("room full" , () => {
                // alert("room is full")
            })
        })
        const handleUpdatedCode = (code) => {
          setCode(code);
          console.log(code);
      };

      socketRef.current.on("updated-code", handleUpdatedCode);

      // Clean up the event listener on component unmount
      return () => {
          socketRef.current.off("updated-code", handleUpdatedCode);
      };

        // socketRef.current.on("updated-code" , (code) => {
        //   setCode(code)
        // })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        console.log("calling browser")
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
            config: {

                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        console.log('incoming from :  ', callerID)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
            config: {

                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    // const handleCodeChange = (e) => {
    //   const newCode = e.target.value
    //   setCode(newCode)
    //   socketRef.current.emit("update-code" , {code , id})
    // }

    // useEffect (() => {
    //   socketRef.current.on("updated-code" , (code) => {
    //     setCode(code)
    //     console.log(code)
    //   })
    // })

    const handleCodeChange = (e) => {
      const newCode = e.target.value;
      setCode(newCode);
      socketRef.current.emit("update-code", { code: newCode, id });
  };

    return (
        <div style={{display : "flex" , width:"100vw" , height :"100vh"}}>
         
            <div style={{width : "74%" ,height : "100%" , border: "2px solid black" }} >
              <h2>{id}</h2>
              <textarea rows={50} cols={100} style={{cursor : "pointer" , backgroundColor : "red"}} onChange={handleCodeChange} value={code}></textarea>
              {/* <Editor/> */}
            </div>
            <div style={{width : "28%" , border: "2px solid black"}}>
                <video style={{width : "96%" , height : "30%" , border: "2px solid black"}} muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer) => {
                    return (
                        <Video key={peer.peerID} peer={peer.peer} />
                    );
                })}
        </div>
        </div>
    );
};

export default Room;
