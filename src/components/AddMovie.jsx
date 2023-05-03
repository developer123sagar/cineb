import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { moviesRef } from "../firebase/firebase";
import swal from "sweetalert";

const AddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    length: "",
    type: "",
    quality: "",
    img: "",
    rating: 0,
    userRated: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const addMovie = async () => {
    try {
      setIsLoading(true);
      await addDoc(moviesRef, form);
      swal({
        title: "Successfully added",
        icon: "success",
        button: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setForm({
        title: "",
        year: "",
        description: "",
        length: "",
        type: "",
        quality: "",
        img: "",
      });
      setIsLoading(false);
    } catch (e) {
      swal({
        title: e,
        icon: "e",
        button: false,
        timer: 3000,
      });
    }
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-10 py-10 w-full">
        <div className="lg:w-7/12 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-28 w-full mt-1 md:mt-0">
          <h2 className="text-white text-xl md:text-lg font-medium title-font mb-5">
            ADD NEW MOVIE
          </h2>

          <div className="relative mb-4">
            <label
              htmlFor="movi-title"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Movie Name
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="flex justify-between">
            <div className="relative mb-4 w-3/6 mr-4">
              <label
                htmlFor="year"
                className="leading-7 text-lg font-bold text-neutral-300"
              >
                Year:
              </label>
              <input
                autoComplete="off"
                type="number"
                min="1995"
                id="year"
                name="year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4 w-3/6">
              <label
                htmlFor="duration"
                className="leading-7 text-lg font-bold text-neutral-300"
              >
                Duration: &nbsp;
              </label>
              <input
                autoComplete="off"
                type="text"
                id="duration"
                name="duration"
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="relative mb-4 w-3/6">
              <label
                htmlFor="type"
                className="leading-7 text-lg font-bold text-neutral-300"
              >
                Type: &nbsp;
              </label>
              <select
                autoComplete="off"
                type="text"
                id="type"
                name="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="series">Series</option>
                <option value="movie">Movie</option>
              </select>
            </div>

            <div className="relative mb-4 w-2/6">
              <label
                htmlFor="quality"
                className="leading-7 text-lg font-bold text-neutral-300"
              >
                Quality: &nbsp;
              </label>
              <select
                autoComplete="off"
                type="text"
                id="quality"
                name="quality"
                value={form.quality}
                onChange={(e) => setForm({ ...form, quality: e.target.value })}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="CAM">CAM</option>
                <option value="HD">HD</option>
              </select>
            </div>
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Image URL
            </label>
            <input
              required
              autoComplete="off"
              type='url'
              id="url"
              name="url"
              value={form.img}
              onChange={(e) => setForm({ ...form, img: e.target.value })}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="description"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Description
            </label>
            <textarea
              type="description"
              id="description"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            onClick={addMovie}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg "
          >
            {isLoading ? (
              <TailSpin
                color="white"
                height={30}
                width={100}
                wrapperStyle={{ "marginLeft": "210px" }}
              />
            ) : (
              "Submit"
            )}
          </button>
          <p className="text-lg mt-3 w-full mx-auto">
            Add new movies on your website. Thank You !!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
