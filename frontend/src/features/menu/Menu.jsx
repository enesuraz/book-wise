import { getMenu } from "../../services/apiBooks";

import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-300 px-2 mt-2">
      {menu.map((book) => (
        <MenuItem book={book} key={book.title} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
