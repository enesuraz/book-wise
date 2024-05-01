import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div className="px-4 py-3">
      <h1 className="font-semibold text-lg mb-2">Something went wrong</h1>
      <p className="text-sm mb-4">{error.data || error.message}</p>
      <button
        className="font-medium  text-blue-500 hover:underline rounded-lg"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
