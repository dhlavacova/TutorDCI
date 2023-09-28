export function Button({ onClick, children }) {
  return (
    <button
      className="bg-indigo-500 text-white px-4 py-1 rounded-md my-2 mt-4 disabled:bg-indigo-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
