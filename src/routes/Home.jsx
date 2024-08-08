import React from 'react';
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';
import bg from '../assets/bg.jpg';
import profile from '../assets/profile.png'
import { useSelector } from 'react-redux';
import MainNavbar from '../components/MainNavbar';

const Home = () => {

    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser)
    return (
        <div className='w-[100vw] h-[100vh]'>

            <MainNavbar/>

            <div className='flex h-[45vh] mt-10'>
                <div className='w-[45%] h-[45vh] flex flex-col justify-center items-center  ml-10'>
                    <h1 className='text-4xl p-4'>Welcome To SyncCode</h1>
                    <p className='text-xl p-8'>
                        Introducing SyncCode, the ultimate collaborative coding platform where two users can solve DSA questions
                        together in real-time. Featuring video conferencing and code synchronization. Experience seamless collaboration with SyncCode today.
                    </p>

                    <div className='w-[100%] mt-10 px-5 py-5'>
                        <Link to={"/create"} className='px-5 py-4 text-xl rounded-xl bg-[#03B2F7] text-white'>Create Room</Link>
                    </div>
                </div>

                <div className='w-[55%] h-[45vh] flex justify-center items-center'>
                    <img src={bg} alt="Background" className='rounded-xl h-[80%] w-[60%]' />
                </div>
            </div>

            {/* <div className='flex h-[40vh] border-2 justify-around w-[100%]'> */}

            <div className='flex h-[40vh]  justify-around items-center'>

                <div className='w-[25%] border-2 h-[50%] flex justify-center items-center rounded-2xl px-4 py-6'>
                    <div className="text-center">
                        <h2 className='text-3xl'>DSA Problem</h2>
                        <p className='text-lg mt-4'>
                            Solve data structure and algorithm problems collaboratively with your friends in real-time.
                        </p>
                    </div>
                </div>
                <div className='w-[25%] border-2 h-[50%] flex justify-center items-center rounded-2xl px-4 py-6 ' >
                    <div className="text-center">
                        <h2 className='text-3xl'>Video Call</h2>
                        <p className='text-lg mt-4'>
                            Utilize built-in video conferencing to discuss problems and strategies face-to-face.
                        </p>
                    </div>
                </div>
                <div className='w-[25%] border-2 h-[50%] flex justify-center items-center rounded-2xl px-4 py-6'>
                    <div className="text-center">
                        <h2 className='text-3xl'>Code Synchronization</h2>
                        <p className='text-lg mt-4'>
                            Sync your code in real-time to work simultaneously on the same problem, ensuring seamless collaboration.
                        </p>
                    </div>
                </div>
            </div>

        </div>

        // </div>
    );
};

export default Home;
