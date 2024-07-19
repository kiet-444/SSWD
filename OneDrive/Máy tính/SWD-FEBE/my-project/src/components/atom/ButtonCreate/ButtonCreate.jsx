import React from "react";
import { Link } from "react-router-dom";
export default function ButtonCreate({ name, add }) {
  const nameLower = name?.toLowerCase();
  return !add ? (
    <Link to={`${nameLower}/create`}>
      <button
        type="button"
        class="rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Add {name}
      </button>
    </Link>
  ) : (
    <Link to={`${add}/create`}>
      <button
        type="button"
        class="rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Add New Product
      </button>
    </Link>
  );
}
