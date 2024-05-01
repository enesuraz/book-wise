import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit} className="sm:basis-4/12 basis-3/5 shrink-0">
      <input
        className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
        type="text"
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
