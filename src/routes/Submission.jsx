import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bg from '../assets/bg2.png';
import profile from '../assets/profile.png'
// import { useSelector } from 'react-redux';
import MainNavbar from '../components/MainNavbar';

const Submission = () => {
  const [submission, setSubmission] = useState([]);
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get("http://3.27.129.89:8000/api/user/submission", {
          headers: {
            id: currentUser._id
          }
        });
        // Handle response data here
        console.log(res.data);
        setSubmission(res.data)
      } catch (error) {
        // Handle error
        console.error('Error fetching submissions:', error);
      }
    };

    // Call fetchSubmission function
    fetchSubmission();
  }, []); // Add dependencies array here


  return (
    <div>
      <MainNavbar/>
      {/* {
        submission.map((sub,index) => (
          <div key={index}>
            <div>{sub.questionName}</div>
          </div>   .. { }  (  ) differnce if if use { } we have to return 
        ))
      } */}

    <div className='w-full flex flex-col items-center text-4xl h-[90vh] p-3 bg-[#262626]'><div className='p-4 rounded-xl border-2 text-white'>Submitted</div>
    {
        submission.map((sub,index) => {
          return (
            <div key={index} className='w-[40%] border-2 p-3 text-2xl mt-2 rounded-xl text-white'>
              <div>{sub.questionName}</div>
            </div>
          )
        })
      }
    </div>


    </div>
  )
}

export default Submission