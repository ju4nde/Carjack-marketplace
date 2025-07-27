import React, { useState } from 'react';
import logo from "../../dist/images/CARJACK.svg"

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [last_name, setLast_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, first_name,last_name}),

        });
        
        const data = await response.json();
        if(response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('justRegistered', 'true');
            window.location.href= "/";
        }
        else {
            setError(data.message);
        }
    }catch (err) {
            setError("error");
        }
};
    





  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={logo}
          alt="Instagram Preview"
          className="max-h-[80%] object-contain"
        />
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        

        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#C60000]">Sign up</h2>
          <input
            type="firstname"
            placeholder="First Name"
            value={first_name}
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <input
            type="lastname"
            placeholder="Last Name"
            value={last_name}
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setLast_name(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value= {password}
            className="w-full mb-4 p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-[#C60000] hover:bg-red-700 text-white p-2 rounded font-semibold"
          >
            Sign Up
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;