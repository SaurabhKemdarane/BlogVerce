import React, { useState } from 'react';
import axios from 'axios';

const CheckBackendButton = () => {
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [showStatus, setShowStatus] = useState(true); 

  const checkBackend = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}/health`, {
        headers: {
          'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID,
          'X-Appwrite-Key': '583a7eb2827066477dd7d133f602b7daea0d3cea58747d6b7a72a31981680d824f564ddd84a01dd123473ffa1a09ac5d43cab3b66e08cf85598f139ba12fc42064007f39b03033e39f62dbfae1f623ca803af7c02174cd92634cedf11afac0a13ded41c6e0c5f2f2d9f4c9aa463f241d777ed58f5a8db5b4b9769f7066c64d82'
        }
      });
      if (response.status === 200) {
        setStatus('Backend is active');
        setIsActive(true);
      } else {
        setStatus('Backend is not active');
        setIsActive(false);
      }
    } catch (error) {
      setStatus('Backend is not active');
      setIsActive(false);
    }

    // Hide status paragraph after 5 seconds
    setTimeout(() => {
      setShowStatus(false);
    }, 5000);
  };

  const buttonClass = isActive === null
    ? 'bg-gray-800 hover:bg-gray-700'
    : isActive
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-red-600 hover:bg-red-700';

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={checkBackend}
        className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${buttonClass}`}
      >
        Check Backend Status
      </button>
      {showStatus && <p className="text-lg text-white">{status}</p>}
    </div>
  );
};

export default CheckBackendButton;
