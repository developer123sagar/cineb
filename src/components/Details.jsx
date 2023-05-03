import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { moviesRef, db } from "../firebase/firebase";
import Reviews from "./Reviews";
import { Bars } from "react-loader-spinner";

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    description: "",
    img: "",
    rating: 0,
    userRated: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "Movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <>{loading ? <div className="flex justify-center items-center"><Bars/></div>:
      <div className="p-4 flex sm:justify-center sm:flex-row w-full mt-3 flex-col md:relative">
        <img
          className="min-w-min sm:h-96 md:sticky top-24 rounded"
          src={data.img}
          alt={data.title}
        />

        <div className="text-justify md:w-1/2 md:ml-4 w-full min-w-min">
          <h1 className=" text-base sm:text-2xl font-bold text-gray-500">
            {data.title}
          </h1>
          <ReactStars
            size={20}
            half={true}
            value={data.rating / data.userRated}
            edit={false}
          />
          <p className="mt-1 text-sm md:text-lg border-b-2 border-gray-500 py-3">
            {data.description}
          </p>
          <Reviews
            id={id}
            prevRating={data.rating}
            userRatedNum={data.userRated}
          />
        </div>
      </div>
}
    </>
  );
};

export default Details;
