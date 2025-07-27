import React, { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';

const CarModelModal = ({ onClose }) => {
  const [carModel, setCarModel] = useState('');
  const [error, setError] = useState('');
  const { profile, loading, setProfile } = useContext(UserContext);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5001/api/user/carmodel", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ car_model: carModel })
      });

      if (response.ok) {
        onClose(); // Close the modal
        setProfile(prev => ({ ...prev, car_model: carModel }));
      } else {
        setError("Could not save car model");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">What car are you looking parts for?</h2>
        <input
          type="text"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. BMW M4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Save and Continue
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CarModelModal;
