import React,    { useState } from "react";

const AddCarForm = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = { make, model };

    try {
      const response = await fetch("http://localhost:5001/api/cars", {method: "POST", headers: {  "Content-Type": "application/json", }, body: JSON.stringify(newCar),});

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message + "ID is: " + data.id);
        setMake("");
        setModel("");
      } else {
        setMessage("Error adding car.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 mx-auto">
      <h2 className="text-xl font-bold mb-3">Add a New Car</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Car
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default AddCarForm;
