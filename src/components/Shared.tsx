import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";
import SharedCards from "./SharedCards";

const Shared = () => {
  const params = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/v1/shared-brain/${params.hash}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.contents);
      })
      .catch((error) => {
        console.error("Error in Sharable", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 pt-20 pb-10 flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        Shared Content
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 justify-items-center">
        {contents.length === 0 ? (
          <h1 className="text-xl md:text-2xl font-medium text-gray-600">
            No content to show right now
          </h1>
        ) : (
          contents.map(({ title, type, link }, index) => (
            <SharedCards key={index} title={title} type={type} link={link} />
          ))
        )}
      </div>
    </div>
  );
};

export default Shared;
