"use client"

export default function BadRequest() {
  const returnToHome = () => {
    window.location.href = '/'
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold">400</h1>
        <p className="text-2xl mt-4">Bad Request</p>
      </div>
      <p className="mt-6 text-lg text-gray-600">Sorry, there was an error with your request. Please try again or go back to the homepage.</p>
      <button
        onClick={returnToHome}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}
