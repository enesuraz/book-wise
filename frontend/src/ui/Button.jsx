import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-white bg-gradient-to-r hover:bg-gradient-to-br focus:outline-none shadow-lg text-sm text-center me-2 mb-2 disabled:cursor-not-allowed";

  const primary =
    base +
    "font-medium px-5 py-2.5 from-blue-500 via-blue-600 to-blue-700 shadow-blue-800/80 rounded-lg";

  const primarySmall =
    base +
    "font-sm px-2 py-1 from-blue-500 via-blue-600 to-blue-700 shadow-blue-800/80 rounded-lg";

  const primaryRed =
    base +
    "font-medium px-5 py-2.5 from-red-500 via-red-600 to-red-700 shadow-red-800/80 rounded-lg";

  const secondary = "font-medium text-blue-500 hover:underline rounded-lg";

  const round =
    base + "text-sm font-medium from-red-500 via-red-600 to-red-700 px-2 py-1";

  if (to)
    return (
      <Link to={to} className={`${type === "link" ? secondary : primary}`}>
        {children}
      </Link>
    );

  if (type === "primaryRed") {
    return (
      <button className={primaryRed} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }

  if (type === "round") {
    return (
      <button
        className={round}
        style={{ borderRadius: "50%" }}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${type === "small" ? primarySmall : primary}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
