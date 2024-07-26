import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Navbar from "./Navbar";
import { useSocket } from "../context/SocketProvider";
import Videos from "./Videos";
import { useSelector } from "react-redux";


const Room = () => {

  const location = useLocation();
  let ques = location.state?.question;
  const { roomId: id } = useSelector((state) => state.room);

  const navigate = useNavigate();
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(15);
  const [userInput, setUserInput] = useState("");
  const options = { fontSize };
  const [code, setCode] = useState("hello world");
  const [result, setResult] = useState();
  const socket = useSocket();
  const [question, setQuestion] = useState();
  //
  useEffect(() => {
    if (ques) {
      console.log(userLang);
      setQuestion(ques);
      if (userLang == "python") {
        setCode(ques.defaultcode.python[1]);
        console.log(ques.defaultcode);
      } else {
        setCode(ques.defaultcode.java[1]);
      }
      socket.emit("question", { id, ques });
    }

    socket.on("updated-code", handleUpdatedCode);
    socket.on("code-result", handleCodeResult);
    socket.on("syncQuestion", handleQuestionId);
    socket.on("clear-res" , clearResult)

    return () => {
      socket.off("clear-res" , clearResult)
      socket.off("syncQuestion", handleQuestionId);
      socket.off("code-result", handleCodeResult);
      socket.off("updated-code", handleUpdatedCode);
    };
  }, [id, ques, userLang]);


  const clearResult = (message) => {
    console.log("res cleared")
    setResult()
  }

  const handleQuestionId = (ques) => {
    setQuestion(ques);
  };

  const handleUpdatedCode = (code) => {
    setCode(code);
  };

  const handleCodeResult = (result) => {
    setResult(JSON.parse(result));
  };

  const handleCodeChange = (value) => {
    setCode(value);
    socket.emit("update-code", { code: value, id });
  };

  const handleSubmit = async () => {
    socket.emit("clear-res" , {id})
    const data = { code, userLang, id, question };
    try {
      // await axios.post("https://webrtc-backend-t27s.onrender.com/submit", data);
      await axios.post("http://3.27.129.89:8000/submit", data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const searchQuestion = () => {
    navigate("/problems");
  };

  let key;
  if (question) {
    key = Object.keys(question.testCases[0].input)[0];
    console.log(key);
  }

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="h-[8%] w-[100vw]">
        <Navbar
          userLang={userLang}
          setUserLang={setUserLang}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          submit={handleSubmit}
          searchQuestion={searchQuestion}
          roomid = {id}
        />
      </div>

      <div className="flex h-[92%] w-[100vw]">
        <div className="w-[25%] h-[100%] p-2 bg-[#262628] text-white overflow-auto">
          {question ? (
            <>
              <div className="text-3xl mt-4 border-1  w-fit px-4 py-3 rounded-xl bg-[#454545]">
                {question.title}
              </div>
              <div className=" mt-4">
                <span className="text-xl  border-1  w-fit px-4 py-2 rounded-xl bg-[#454545] text-[#6376F0]">{question.category} </span> 
                <span className="text-xl mx-2 border-1  w-fit px-4 py-2 rounded-xl bg-[#454545] text-[#6376F0]" >{question.difficulty} </span>
              </div>

              <div className="text-xl mt-4   w-fit px-4 py-3 rounded-xl bg-[#454545]">
                {question.description}
              </div>
              <div className="mt-4  w-fit  px-4 py-3 rounded-xl text-xl bg-[#454545]">
                Constraints{" "}
                {question.constraints.map((data, index) => (
                  <p
                    className="text-xl bg-[#454545]  rounded-xl "
                    key={index}
                  >
                    {" "}
                    = {data}
                  </p>
                ))}
              </div>
              <div className="mt-4  w-[100%]  px-4 py-3 rounded-xl text-xl bg-[#454545] ">
                <>
                  <div className="">TestCase 1</div>
                  {
                    Object.keys(question.testCases[0].input).map(res => (
                      <>
                      <div className="">- {res} : {JSON.stringify(question.testCases[0].input[res])}</div>
                      </>
                    ))
                  }
                 
                  
                  <div className="">- Output : {JSON.stringify(question.testCases[0].output)}</div>

                  <br></br>

                  <div className="">TestCase 2</div>
                  {
                    Object.keys(question.testCases[1].input).map(res => (
                      <>
                      <div className="p">- {res} : {JSON.stringify(question.testCases[1].input[res])}</div>
                      </>
                    ))
                  }
                 
                  
                  <div className="">- Output : {JSON.stringify(question.testCases[1].output)}</div>
                </>
              </div>
            </>
          ) : (
            <div className="w-[100%] h-[100vh] flex flex-col items-center bg-[#4747474]">
              Select the problem
            </div>
          )}
        </div>

        <div className="w-[50%] h-[100%] bg-black">
          <div className="h-[72%]">
            <Editor
              options={options}
              height="100%"
              width="100%"
              theme={userTheme}
              language={userLang}
              defaultLanguage="python"
              defaultValue=""
              onChange={handleCodeChange}
              value={code}
            />
          </div>

          <div className="h-[28%]  text-white flex text-m justify-around ">
            {result &&
              result.map((res, index) => (
                <div key={index} className="m-2  border border-white rounded-xl bg-[#3a3838] flex flex-col p-3 px-5 justify-around">
                  <div  className = {res.passed ? "bg-green-500 rounded-xl px-3 py-2" :"bg-red-500  rounded-xl px-3 py-2"} >Test Case {index + 1}:</div>
                  <div>
                    {
                      Object.keys(res.testCase.input).map(key => (
                        <>
                        {/* <div>{key} : </div>  */}
                        <div className="">{key} : {JSON.stringify(res.testCase.input[key])}</div>
                        </>
                      )) 
                    }
                  </div>
                  <div>Expected Output: {JSON.stringify(res.testCase.output)}</div>
                  <div>Your Output: {res.youroutput}</div>
                  {/* <div>Passed: {res.passed ? <span className="bg-green-500">Yes</span> : <span className="bg-red-500">No</span> }</div> */}
                </div>
              ))
            }
          </div>
        </div>

        <div className="w-[25%]">
          {/* video working */}
          <Videos id={id} />
        </div>
      </div>
    </div>
  );
};

export default Room;
