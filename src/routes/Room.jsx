import React, { useEffect , useState } from "react";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from 'axios';
import Navbar from "./Navbar";
import { useSocket } from "../context/SocketProvider";
import Videos from "./Videos";



const Room = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const options = { fontSize };
  const [code, setCode] = useState("hello world");
  const [result, setResult] = useState({});
  const socket = useSocket()

  useEffect(() => {
    
    // socket.emit("join room" , id)
    socket.on("updated-code", handleUpdatedCode);
    socket.on('code-result', handleCodeResult);

    return () => {
      socket.off('code-result', handleCodeResult);
      socket.off("updated-code", handleUpdatedCode);
    };
  }, [id]);

  const handleUpdatedCode = (code) => {
    console.log(code)
    setCode(code);
  };

  const handleCodeResult = (result) => {
    setResult(result);
  };




  const handleCodeChange = (value) => {
    setCode(value);
    socket.emit("update-code", { code: value, id });
  };

  const handleSubmit = async () => {
    const data = { code, userLang, id, userInput };
    try {
      await axios.post('http://localhost:8000/submit', data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="h-[100vh] overflow-hidden bg-[#4747474]">

      <div className="h-[7%] bg-[#474747]">
        <Navbar
          userLang={userLang}
          setUserLang={setUserLang}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          submit={handleSubmit}
        />
      </div>
      <div className="flex  h-[93%]">
        <div className="w-[75%] h-[100%]">
          <div className="h-[80%]">
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

          <div className="h-[20%] bg-black text-white flex " >

            <div className="w-[50%]  bg-[#474747] flex flex-col text-center">
              <h2>Input</h2>
              <textarea
                className="bg-[#474747] w-[80%] h-[75%] text-white p-2"
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <div className="w-[50%] border-l-2 bg-[#474747] p-2 flex flex-col text-center">
            <h2>Output</h2>
            <textarea
                className="bg-[#474747] w-[80%] h-[75%] text-white p-2"
                value={result.output}
              />
            </div>
          </div>
        </div>

        <div className="w-[25%] ">
            {/* video working */}
            <Videos id = {id}/>
        </div>
      </div>
    </div>
  );
};

export default Room;
