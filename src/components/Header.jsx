/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppState } from "../App";

const Header = () => {
  const useAppState = useContext(AppState);

  const [showAddMovie, setShowAddMovie] = useState(true);
  const toggleButton = () => {
    setShowAddMovie(!showAddMovie);
  };

  return (
    <div className="text-xl md:text-3xl p-2 flex justify-between text-red-600 font-bold border-gray-500 border-b-2 items-center sticky top-0 z-20 header-sticky">
      <Link to="/"><span>
        Cineb<span className="text-white">net</span>
      </span></Link>
      {useAppState.isLogin ? (
        <Link to={"/addmovie"}>
          <h1 className=" text-lg flex items-center">
            <Button onClick={toggleButton}>
              {showAddMovie ? (
                <div>
                  <AddIcon className="mr-2" color="secondary" />
                  <span className="text-white font-bold">Add New</span>
                </div>
              ) : (
                <h1>
                  <Link to={"/"}>
                    <div className="text-white font-bold">Go Back</div>
                  </Link>
                </h1>
              )}
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg bg-purple-600 cursor-pointer flex items-center rounded">
            <Button>
              <span className="text-white">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
