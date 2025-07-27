import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust if path differs
import DesktopMenuBar from '../components/DesktopMenuBar';

const ProfilePage = () => {
  const { profile, loading, setProfile } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setProfile(null);
    navigate('/');
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100">
      <DesktopMenuBar setSearchResults={setSearchResults} />
    <div className="min-h-screen flex items-center justify-center ">
      <div className="shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#C60000] mb-6">My Profile</h2>

        {!profile ? (
          <p className="text-center text-gray-600">No profile loaded. Please log in.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">First Name:</span>
              <span className="text-gray-900">{profile.first_name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Last Name:</span>
              <span className="text-gray-900">{profile.last_name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-900">{profile.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">User ID:</span>
              <span className="text-gray-900">{profile.userId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Car Model:</span>
              <span className="text-gray-900">{profile.car_model || "Not set"}</span>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full mt-6 bg-[#C60000] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      </div>
      </div>
  );
};

export default ProfilePage;
