export const FormStateError = ({ error }: { error?: string }) => {
    if (!error) return null; // Avoid rendering an empty tag

    return <p className="text-red-500 text-xs mt-1">{error}</p>;
};
