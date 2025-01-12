'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (otp === '123456') { 
      router.push('/register'); // Redirect to the Register page
    } else {
      setError('Invalid OTP');
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setOtp((prev) => prev + value);

      // Move focus to next input
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Resend OTP Timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      {/* Close button */}
      <div className="absolute top-4 right-4 text-white text-2xl cursor-pointer">&times;</div>

      {/* Header */}
      <h1 className="text-4xl font-bold text-white">EventEase</h1>
      <p className="mt-2 text-white text-lg">Let the celebrations begin with EventEase!</p>

      {/* OTP Form */}
      <div className="bg-white p-8 mt-8 rounded-lg shadow-lg w-[90%] sm:w-96">
        <p className="text-center text-gray-700 mb-4">
          Enter OTP sent to <span className="font-semibold">+91 1234567890</span>
        </p>
        <form onSubmit={handleOTPSubmit} className="space-y-4">
          {/* OTP Input */}
          <div className="flex justify-between">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={otp[index] || ''}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-center text-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Resend Timer */}
          <p className="text-sm text-gray-500 text-center">
            Resend OTP in <span className="text-blue-500 font-semibold">{`00:${resendTimer
              .toString()
              .padStart(2, '0')}`}</span>
          </p>

         
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );
}
