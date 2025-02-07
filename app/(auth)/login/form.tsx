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
            <div className="flex justify-center text-sm mt-2">
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
            </div>
          <div className="text-center mt-4">
            <a href="/admin/activity" className="text-blue-600 hover:underline">Admin Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}