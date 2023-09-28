export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-xs block mt-2 text-slate-900">
      {children}
    </label>
  );
}
