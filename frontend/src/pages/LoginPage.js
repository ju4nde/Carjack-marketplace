import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../dist/images/CARJACK.svg"; // Adjust path if needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccess('Login successful!');
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={logo}
          alt="myGarage logo"
          className="max-h-[80%] object-contain"
        />
      </div>

      {/* Right side login form */}
      <div className="w-1/2 flex flex-col items-center justify-center px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white border border-gray-200 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#C60000]">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#C60000] hover:bg-red-700 text-white p-2 rounded font-semibold"
          >
            Login
          </button>

          {/* Optional success and error messages */}
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          {success && <p className="text-green-500 mt-2 text-sm">{success}</p>}
        </form>

        <Link to="/register" className="mt-4 text-sm text-gray-600 hover:text-[#C60000]">
          Don’t have an account? <span className="underline">Register here</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
