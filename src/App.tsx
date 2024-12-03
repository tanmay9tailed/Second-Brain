import React, { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "./config";

const App = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [contents, setContents] = useState([]);
  const [added, setAdded] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }

    axios
      .get(`${URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error in getting user content", error);
      });
  }, [added]);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div
        className={`absolute sm:relative ${
          openSideBar ? "translate-x-[-100%]" : "translate-x-0"
        } sm:translate-x-0 w-full sm:w-1/2 lg:w-1/5 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        <SideBar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />
      </div>

      <div
        className={`flex-grow bg-slate-50 relative ${
          openSideBar ? "w-full" : "w-full"
        } sm:w-1/2 lg:w-4/5`}
      >
        <Navbar
          setOpenSideBar={setOpenSideBar}
          openSideBar={openSideBar}
          setAdded={setAdded}
        />
        <div className="h-screen overflow-y-auto px-6 pt-36 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-6 justify-items-center items-start">
            {contents.length === 0 ? (
              <h1 className="text-4xl font-semibold text-gray-600">
                No contents to show right now.
              </h1>
            ) : (
              contents.map(({ title, type, link, _id }, index) => (
                <Cards
                  key={index}
                  title={title}
                  type={type}
                  link={link}
                  contentId={_id}
                  setAdded={setAdded}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
