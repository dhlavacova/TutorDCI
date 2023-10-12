import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative inline-block bg-slate-300 font-semibold py-3 px-4 rounded-full text-black transition overflow-hidden"
  >
    {children}
    <div className="absolute inset-0 bg-transparent  opacity-0 backdrop-blur-lg hover:opacity-50 transition"></div>
  </Link>
);
