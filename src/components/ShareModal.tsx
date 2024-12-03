import React from 'react';

const ShareModal = ({ isOpen, onClose, onConfirm, onDelete, shareUrl }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Share Content</h2>

        {shareUrl ? (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-700">
              Here is your shareable URL: 
              <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600">
                {shareUrl}
              </a>
            </p>
          </div>
        ) : (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-700">Do you want to generate the share URL?</p>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {!shareUrl && (
            <button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
          {shareUrl && (
            <button
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          <button
            className="w-full bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
