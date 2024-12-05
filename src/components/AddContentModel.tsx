import { useState } from 'react';

interface AddContentModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string, link: string, type: string }) => void;
}

const AddContentModel: React.FC<AddContentModelProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState<{ title?: string; link?: string; type?: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { title?: string; link?: string; type?: string } = {};
    if (!title) newErrors.title = "Title is required.";
    if (!link) newErrors.link = "Link is required.";
    if (!type) newErrors.type = "Type is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({ title, link, type });
    setTitle('');
    setLink('');
    setType('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-center">Add Content</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.link && <p className="text-sm text-red-500 mt-1">{errors.link}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
            </select>
            {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContentModel;
