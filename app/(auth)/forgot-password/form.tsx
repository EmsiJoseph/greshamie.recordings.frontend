export function ForgotPasswordForm() {
    const InputField = ({ label, type, placeholder }: { label: string; type: string; placeholder: string }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
        </div>
    );

    return (
        <>
            <div className="my-5"></div>
            <h1 className="font-semibold text-3xl">Reset Password</h1>
            <div className="my-5"></div>
            <form className="w-full md:w-1/2 flex-shrink-0 max-w-md mx-auto">
                <InputField label="Email" type="email" placeholder="Enter your email address" />
                <button className="w-full bg-lime-600 text-white py-2 rounded-md mt-4">Reset Password</button>
                <div className="flex justify-center text-sm mt-2">
                    <a href="/login" className="text-blue-600">Back to login</a>
                </div>
            </form>
        </>
    );
}
