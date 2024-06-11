import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Modal from "./createModal";
import Navbar from "./navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableRow = ({ id, title, description, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-6 gap-3 items-center border-b py-2">
      <div className="col-span-1 text-center">{id}</div>
      <div className="col-span-2">{title}</div>
      <div className="col-span-2">{description}</div>
      <div className="col-span-1 flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [toEdit, setToEdit] = useState(null);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem('Authorization')
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("/todos", {
        params: { status: filter }
      });
      setTodos(response.data);
    };

    user && fetchTodos();
  }, [user, filter]);

  if (loading) return <p>Loading...</p>;

  const handleOpenModal = () => {
    setToEdit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreate = async (title, description, status) => {
    try {
      const response = await axios.post('/todos', {
        todo: {
          title,
          description,
          status
        }
      });

      if (response.status === 201) {
        const newTodo = response.data;
        setTodos([...todos, newTodo]);
      } else {
        console.error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleEdit = (id) => {
    const filteredTodo = todos.filter((todo) => todo.id === id);
    setToEdit(filteredTodo);
    setShowModal(true);
  };

  const EditToDo = async ({ title, description, status }) => {
    if (toEdit == null) {
      handleCreate(title, description, status);
    } else {
      try {
        const response = await axios.patch(`/todos/${toEdit[0].id}`, {
          todo: { title, description, status }
        });

        if (response.status === 200) {
          const updatedTodo = response.data;
          const updatedTodos = todos.map((todo) =>
            todo.id === toEdit[0].id ? updatedTodo : todo
          );
          setTodos(updatedTodos);
        } else {
          console.error("Failed to update todo");
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/todos/${id}`);

      if (response.status === 204) {
        setTodos(todos.filter((todo) => todo.id !== id));
        toast("Item deleted successfully.");
      } else {
        console.error("Failed to delete todo");
        toast("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast("Error deleting item.");
    }
  };

  return (
    <div>
      <Navbar logged={true} />
      <ToastContainer />
      <div>
        <div className="flex mr-[130px] p-5">
          <button
            className="ml-auto px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleOpenModal}
          >
            Add new task
          </button>
          {showModal && (
            <Modal
              id={toEdit?.[0].id}
              onClose={handleCloseModal}
              Description={toEdit?.[0].description}
              Title={toEdit?.[0].title}
              Status={toEdit?.[0].status}
              editToDo={EditToDo}
            />
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-2 rounded ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded ${
              filter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="container mx-auto mt-8">
          <div className="bg-white shadow-md rounded my-6">
            <div className="grid grid-cols-6 gap-3 items-center border-b border-gray-200 bg-gray-100 py-2">
              <div className="col-span-1 text-center font-bold">ID</div>
              <div className="col-span-2 text-center font-bold">Title</div>
              <div className="col-span-2 text-center font-bold">Description</div>
              <div className="col-span-1"></div>
            </div>

            <div>
              {todos.map((todo) => (
                <TableRow
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  title={todo.title}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(todo.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
