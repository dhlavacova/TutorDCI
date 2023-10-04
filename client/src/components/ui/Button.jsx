export function Button({ onClick, children }) {
  return (
    <button
      className="w-full bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md my-2 mt-4 disabled:bg-indigo-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
