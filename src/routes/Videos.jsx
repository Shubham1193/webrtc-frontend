import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { useSocket } from '../context/SocketProvider'

const Videos = ({id}) => {
    const [peerId, setPeerId] = useState('')
    const remoteVideoRef = useRef(null)
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('')
    const peerInstance = useRef()
    const currentUserVideoRef = useRef()
    const socket = useSocket()

    useEffect(() => {

        const peer = new Peer()

        peer.on('open', (idd) => {
            setPeerId(idd)
            socket.emit('join room' , {id , peerId :  idd  })
        })

        socket.on("other user" , data => {
            // 
           call(data[0])
        })


        
        

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia
            getUserMedia({ video: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream
                currentUserVideoRef.current.play()
                call.answer(mediaStream)
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play()
                })
            })
        })
        peerInstance.current = peer
    }, [])

    console.log(peerId)

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia
        getUserMedia({ audio: false, video: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream
            currentUserVideoRef.current.play()
            const call = peerInstance.current.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play()
            })
        })
    }

    return (
        <div className='w-[100%] border-2 flex flex-col justify-center items-center'>
            {/* <input
                type='text'
                value={remotePeerIdValue}
                onChange={e => setRemotePeerIdValue(e.target.value)}
                className='border rounded px-2 py-1'
            />
            <button
                onClick={() => call(remotePeerIdValue)}
                className='ml-2 px-4 py-1 bg-blue-500 text-white rounded'
            >
                Call
            </button> */}
            <div className='mt-2'>
                <video ref={currentUserVideoRef} className='rounded-lg  border-gray-300 h-[25vh]'></video>
            </div>
            <div className='mt-2'>
                <video ref={remoteVideoRef} className='rounded-lg  border-gray-300 h-[25vh]' ></video>
            </div>
        </div>
    )
}

export default Videos
