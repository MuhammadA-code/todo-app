import { useState } from "react";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ id, Title, Description, onClose, Status, editToDo }) => {
  const [title, setTitle] = useState(Title);
  const [description, setDescription] = useState(Description);
  const [status, setStatus] = useState(Status);

  const handleStatusChange = (e) => {
    setStatus("completed");
  };

  const handleDoneClick = () => {
    const params = { title: title, description: description, status: id ? status : 'pending' }
    editToDo(params);
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 modal-overlay"
      onClick={handleOutsideClick}
    >
      <div className="relative bg-white w-[600px] h-[400px] p-8 rounded-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>

        <textarea
          placeholder="Title"
          required
          maxLength={25}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h- overflow-y-auto resize-none"
        />

        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 overflow-y-auto resize-none"
        />

        <div>
          {status ? (
            <div className="mt-5 inline-flex items-center">
              Status: {status}
              {status !== "completed" ? (
                <MdDone
                  className="ml-2 p-1 bg-green-500 text-white rounded-full"
                  title="Mark task as done"
                  size={20}
                  onClick={handleStatusChange}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div> Status: Pending</div>
          )}
        </div>

        <button
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 block"
          onClick={handleDoneClick}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
