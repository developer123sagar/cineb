import React, { createContext, useState } from "react";
import Header from "./components/Header";
import AddMovie from "./components/AddMovie";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Login from "./components/Login";
import Signup from "./components/Signup"

const AppState = createContext()
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");


  return (
    <AppState.Provider value={{isLogin, setIsLogin, userName, setUserName}}>
    <div className="relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};
