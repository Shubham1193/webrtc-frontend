import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import Signin from "./routes/Singnin";
import PrivateRoute from "./components/PrivateRoute";
import Problems from "./routes/Problems";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<CreateRoom />} />
          <Route path="/room" element={<Room />} />
          <Route path='/problems' element={<Problems/>} />
        </Route>

        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
