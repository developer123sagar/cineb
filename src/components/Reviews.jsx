import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";

const Reviews = ({ id, prevRating, userRatedNum }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [thought, setThought] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0)

  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewRef, {
        movieId: id,
        userName: "sagar chand",
        rated: rating,
        thought: thought,
        timestamp: new Date().getTime(),
      });

      const docRef = doc(db, "Movies", id);
      await updateDoc(docRef, {
        rating: prevRating + rating,
        userRated: userRatedNum + 1,
      });
      swal({
        title: "Thank you for your review!",
        icon: "success",
        button: false,
        timer: 2000,
        timerProgressBar: true,
      });
      setThought("");
      setRating(0);
      setNewAdded(newAdded + 1);
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        button: false,
        timer: 2000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setData([]);
      let _quer = query(reviewRef, where("movieId", "==", id));
      const querySnapShot = await getDocs(_quer);

      querySnapShot.forEach((element) => {
        setData((prev) => [...prev, element.data()]);
      });

      setReviewLoading(false);
    }
    getData();
  }, [newAdded]);

  return (
    <div className="mt-2 w-full">
      <ReactStars
        size={30}
        half={true}
        edit={true}
        onChange={(rate) => setRating(rate)}
        value={rating}
      />
      <input
        required={true}
        placeholder="Share your review"
        className="w-full outline-none p-2 bg-gray-800 text-bold text-white rounded"
        spellCheck="false"
        onChange={(e) => {
          setThought(e.target.value);
        }}
        value={thought}
      />
      <button
        onClick={sendReview}
        className="w-full bg-green-600 p-2 flex justify-center rounded"
      >
        {loading ? <ThreeCircles color="white" height={25} /> : "Share"}
      </button>
      {reviewLoading ? (
        <div className="flex justify-center mt-4">
          <ThreeDots height={12} color="white" />
        </div>
      ) : (
        <div className="mt-3 overflow-hidden overflow-y-scroll review">
          {data.map((e, i) => {
            return (
              <div
                key={i}
                className="bg-gray-900 w-full p-2 border-b-2 border-black rounded"
              >
                <div className="flex">
                  <p className="text-yellow-400">{e.userName}</p>
                  <p className="ml-6 text-xs">
                    {new Date(e.timestamp).toLocaleString()}
                  </p>
                </div>
                <div>{<ReactStars value={e.rated} edit={false} />}</div>
                <p className="text-sm">{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
