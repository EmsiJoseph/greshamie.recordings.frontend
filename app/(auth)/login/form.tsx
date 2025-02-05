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
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-10 flex-shrink-0 min-h-screen md:min-h-0">
        <h1 className="font-semibold text-3xl">Welcome back</h1>
        <div className="my-5"></div>
      <form className="w-full max-w-md mx-auto">
        <InputField label="Username" type="text" placeholder="Enter your username from Clarify.go" />
        <InputField label="Password" type="password" placeholder="Enter your password" />
        <button className="w-full bg-lime-600 text-white py-2 rounded-md mt-4">Login</button>
        <div className="flex justify-between text-sm mt-2">
          <label>
            <input type="checkbox" className="mr-1" /> Remember me
          </label>
          <a href="/forgot-password" className="text-blue-600">Forgot your password?</a>
        </div>
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-500"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or Continue With</span>
          </div>
        </div>
        <div className="my-4"></div>
        <div className="mt-4 flex items-center justify-center">
          <button className="w-full bg-white text-accent-foreground py-2 rounded-md flex items-center justify-center border border-gray-300">
            <img src="/microsoft.png" alt="Microsoft Logo" className="h-5 w-5 mr-2" />
            Continue with Microsoft
          </button>
        </div>
      </form>
    </div>
  );
}
