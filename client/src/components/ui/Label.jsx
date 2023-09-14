export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-xs block my-1 text-slate-900">
      {children}
    </label>
  );
}
