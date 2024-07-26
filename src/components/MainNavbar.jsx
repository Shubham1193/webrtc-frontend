import React from 'react'
import { Link } from 'react-router-dom';
import bg from '../assets/bg2.png';
import profile from '../assets/profile.png'
import { useSelector } from 'react-redux';

const MainNavbar = () => {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='p-6 px-8 flex justify-between items-center h-[10vh] bg-[#03B2F7]'>
                <div>
                    <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">SyncCode</span>
                </div>
                <div />
                <div className=' w-[30%] flex justify-around items-center '>
                    <div>
                        <Link to={'/'} className="text-xl">Home</Link>
                    </div>
                    <div>
                        <Link to={"/create"} className="text-xl">Room</Link>
                    </div>
                    <div>
                        <Link to={"/submission"} className="text-xl">Submission</Link>
                    </div>
                    <div>
                        <Link to={"/problems"} className="text-xl">Problems</Link>
                    </div>
                    <div>
                        <button className="text-xl ">
                            {
                                !currentUser ? <Link to={'/sign-in'}>SignIn</Link> : <img src={profile} className='w-[50px] h-[100%]' ></img>
                            }
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default MainNavbar