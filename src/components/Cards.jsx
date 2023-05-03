import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const data = await getDocs(moviesRef);
      data.forEach((doc) => {
        setData((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
      });

      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex p-2 relative -top-2 flex-wrap justify-evenly card">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          {" "}
          <ThreeDots height={100} width={100} />
        </div>
      ) : (
        data.map((item, i) => {
          return (
            <Link to={`/details/${item.id}`} key={i}>
              <div className="transition duration-500 hover:-translate-y-1 p-2 w-42 sm:w-48">
                <span className="relative top-6 p-2 font-extrabold">
                  {item.quality}
                </span>
                <div>
                  <img
                    className="rounded cursor-pointer"
                    src={item.img}
                    alt="movie"
                  />
                  <h1 className=" text-sm mt-1 truncate">{item.title}</h1>
                  <ReactStars
                    size={20}
                    half={true}
                    value={item.rating/item.userRated}
                    edit={false}
                  />
                  <div className="flex gap-1 relative sm:gap-3">
                    <span>{item.year}</span>
                    <span>.</span>
                    <span>{item.length}</span>
                    <span className="absolute right-0">{item.type}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
