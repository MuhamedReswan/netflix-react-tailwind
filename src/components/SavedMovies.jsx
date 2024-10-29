import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { IoIosCloseCircle } from "react-icons/io";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  useEffect(() => {
    if (user?.email) {
      onSnapshot(
        doc(db, "users", `${user.email}`),
        (doc) => {
          setMovies(doc.data()?.savedMovies || []);
        },
        (error) => {
          console.error("Error fetching saved movies:", error);
        }
      );
    }
  }, [user?.email]);


const movieRef = doc(db,'users',`${user?.email}`);

const deleteSaved = async(passedId)=>{
try {
    const result = movies.filter((item)=>item.id!==passedId);
    await updateDoc(movieRef,{
        savedMovies:result
    });
} catch (error) {
 console.log(error);   
}
}


  return (
    <>
      {movies.length === 0 ? (
        <div className="relative ">
        <p className="absolute text-bold my-5 md:text-2xl text-center left-[40%] top-[20%] text-gray-300">No saved movies</p>

        </div>
      ) : (
        <div className="relative flex items-center group">
          <MdChevronLeft
            className="left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
            onClick={slideLeft}
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            {movies.map((item, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="whitespace-normal text-white text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p
                    onClick={() => deleteSaved(item.id)}
                    className="text-gray-500 absolute top-2 right-2"
                  >
                    <IoIosCloseCircle />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            className="right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
            onClick={slideRight}
          />
        </div>
      )}
    </>
  );
};

export default SavedMovies;
