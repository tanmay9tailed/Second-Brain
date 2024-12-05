import { useEffect, useState } from "react";
interface SharedCardsProps {
  title: string;
  type: "youtube" | "twitter"; 
  link: string;
}

const SharedCards: React.FC<SharedCardsProps> = ({ title, type, link }) => {
  const [embedLink, setEmbedLink] = useState<string>(link);

  const embededLink = () => {
    if (type === "youtube") {
      link = link.replace("watch?v=", "embed/");
      if (link.includes("&")) {
        const c = link.indexOf("&");
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

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden w-full max-w-sm p-4 flex flex-col gap-4">
      {/* Card Header */}
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      {/* Content */}
      <div className="flex justify-center items-center">
        {type === "youtube" ? (
          <iframe
            className="w-full h-52 rounded-md"
            src={embedLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet w-full">
            <a href={embedLink} target="_blank" rel="noopener noreferrer">
              View Tweet
            </a>
          </blockquote>
        )}
      </div>

      {/* Footer */}
      <div
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          type === "youtube"
            ? "bg-red-100 text-red-800"
            : type === "twitter"
            ? "bg-gray-100 text-gray-800"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
    </div>
  );
};

export default SharedCards;
