export function LoginForm() {
  const InputField = ({ label, type, placeholder }: { label: string; type: string; placeholder: string }) => (
    <div className="mb-4 flex-shrink-0">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );

  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl bg-white p-4 md:p-12">
        <form className="w-full mt-6">
          <InputField label="Username" type="text" placeholder="Enter your username from Clarify.go" />
          <InputField label="Password" type="password" placeholder="Enter your password" />
          <button className="w-full bg-lime-600 text-white py-3 rounded-md mt-4 text-lg font-medium hover:bg-lime-700 transition">
            Login
          </button>
          <div className="flex justify-between text-sm mt-2">
            <label>
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">Or Continue With</span>
            </div>
          </div>
          <button className="w-full bg-white text-gray-700 py-3 rounded-md flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition">
            <img
              src="/microsoft.png"
              alt="Microsoft Logo"
              className="h-5 w-5 mr-2"
            />
            Continue with Microsoft
          </button>
          <div className="text-center mt-4">
            <a href="/admin/activity" className="text-blue-600 hover:underline">Admin Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}