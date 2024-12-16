import React, { useState,useEffect } from "react";

const App = () => {
  const [task, setTask] = useState([]);
  const [show, setShow] = useState("1");
  const [input, setInput] = useState("");
  const [index, setIndex] = useState("");


  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    setTask(savedTasks?.length > 0 ? JSON.parse(savedTasks) : []);
  }, []);
  


 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (show == "1") {
      const updatedTasks = [input, ...task]; // Create the updated array
      setTask(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      console.log(task);
      console.log(task.length);

      setInput("");

     

    } else {
      const update = task.map((elem, id) => (id === index ? input : elem));
      setTask(update);
    localStorage.setItem('tasks',JSON.stringify(update))

      setInput("");
      setShow("1");
    }
  };

  const handleDelete = (e) => {
    const restitem = task.filter((elem, index) => index != e);
    setTask(restitem);
    localStorage.setItem('tasks',JSON.stringify(restitem))
  };

  const handleEdit = (elem, index) => {
    setShow("-1");
    setInput(elem);
    setIndex(index);
  };

  return (
    <div className="m-20">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {show == "1" ? (
          <button className="bg-green-500 p-2 rounded-lg cursor-pointer w-20 text-white font-bold">
            Add
          </button>
        ) : (
          <button className="bg-green-500 p-2 rounded-lg cursor-pointer w-20 text-white font-bold">
            Update
          </button>
        )}
      </form>

      <div>
        {task.map((elem, index) => (
          <div className="bg-gray-300 mt-2 p-2 rounded-xl w-96  font-bold flex justify-between">
            <h1>{elem}</h1>

            <div>
              <button
                className="bg-blue-500 p-2 rounded-lg cursor-pointer w-20 text-white font-bold"
                onClick={() => handleEdit(elem, index)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 ml-2 p-2 rounded-lg cursor-pointer w-20 text-white font-bold"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



















// const url = URL.createObjectURL(e.target.files[0]);