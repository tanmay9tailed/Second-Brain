import { useState } from "react";
import Button from "./ui/Button";
import PlusIcon from "../icons/PlusIcon";
import Share from "../icons/Share";
import AddContentModel from "./AddContentModel";
import axios from "axios";
import { URL } from "../config";
import ShareModal from "./ShareModal";

// Define types for the Navbar props
interface NavbarProps {
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  openSideBar: boolean;
  setAdded: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar: React.FC<NavbarProps> = ({ setOpenSideBar, openSideBar, setAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");

  // Toggle sidebar visibility
  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  // Fetch the shareable URL
  const fetchShareUrl = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      setShareUrl(`https://second-brain-iq3h.onrender.com/shared/${response.data.link}`);
    } catch (error) {
      console.error("Error fetching share URL:", error);
      alert("Failed to fetch the share URL.");
    }
  };

  // Delete the shareable URL
  const deleteShareUrl = async () => {
    try {
      await axios.post(
        `${URL}/api/v1/share`,
        { share: false },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      setShareUrl("");
      alert("Shareable link deleted successfully.");
    } catch (error) {
      console.error("Error deleting share URL:", error);
      alert("Failed to delete the share URL.");
    }
  };

  return (
    <div className="bg-gray-300 flex w-full justify-between items-center py-4 px-3 sm:py-6 sm:px-6 absolute top-0 z-[100]">
      <div>
        <div
          className="w-10 z-[100] hover:bg-blue-700 text-white cursor-pointer p-1 rounded block sm:hidden"
          onClick={handleSideBar}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-6">
        {/* Share Button */}
        <Button
          text="Share"
          variant="secondary"
          size="md"
          startIcon={<Share className="w-6" color="#9333ea" />}
          onClick={() => setIsShareModalOpen(true)}
        />

        {/* Add Content Button */}
        <Button
          text="Add Content"
          variant="primary"
          size="md"
          startIcon={<PlusIcon className="w-6 font-bold" color="white" />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Add Content Modal */}
      <AddContentModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={({ title, link, type }) => {
          axios
            .post(
              `${URL}/api/v1/content`,
              { title, link, type },
              {
                headers: {
                  Authorization: localStorage.getItem("token") || "",
                },
              }
            )
            .then(() => {
              setAdded(Math.random() * 10000); // Refresh added content
            })
            .catch((error) => {
              console.error("Error in submitting content:", error);
            });
        }}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onConfirm={fetchShareUrl}
        onDelete={deleteShareUrl}
        shareUrl={shareUrl}
      />
    </div>
  );
};

export default Navbar;
