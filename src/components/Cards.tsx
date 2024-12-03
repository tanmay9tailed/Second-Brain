import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../config";

const Cards = ({ title, type, link, contentId, setAdded }) => {
  const [embedLink, setEmbedLink] = useState(link);

  const embededLink = () => {
    if (type === "youtube") {
      link = link.replace("watch?v=", "embed/");
      if (link.includes("&")) {
        const c = link.indexOf("&");
        const n = link.length;
        link = link.slice(0, c);
      }
    } else if (type === "twitter") {
      link = link.replace("x", "twitter");
      link = link + "?ref_src=twsrc%5Etfw";
    }
    setEmbedLink(link);
  };

  useEffect(() => {
    embededLink();
  }, []);

  const deleteContent = () => {
    axios
      .delete(`${URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: { contentId },
      })
      .then((response) => {
        setAdded(Math.random() * 10000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="relative group h-56 hover:h-full transition-all duration-500 w-full sm:w-96 bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg shadow-black/30 rounded-xl overflow-hidden flex flex-col p-4 transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800 p-2 group-hover:text-gray-600 transition-all">
          {title}
        </h1>
        <div
          className="p-2 rounded cursor-pointer bg-gray-200 group-hover:bg-red-500 transition-colors"
          onClick={() => deleteContent()}
        >
          <svg
            fill="currentColor"
            height="15px"
            width="15px"
            viewBox="0 0 290 290"
          >
            <g>
              <path d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15 h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z"></path>
              <path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="mt-4">
        {type === "youtube" ? (
          <iframe
            className="w-full rounded-md shadow-md group-hover:shadow-lg transition-shadow"
            src={embedLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet w-full">
            <a href={embedLink}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Cards;
