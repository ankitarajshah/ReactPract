// src/pages/ErrorPage.jsx
import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  console.error(error); // For debugging purposes

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="mt-2 text-gray-700">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
    </div>
  );
};

export default ErrorPage;
