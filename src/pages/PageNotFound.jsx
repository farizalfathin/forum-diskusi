import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="w-full h-screen text-center flex flex-col justify-center items-center">
      <h1 className="text-9xl">404</h1>
      <h3 className="mb-1 text-lg">Not Found</h3>
      <Link className="text-2xl text-primary-500" to="/">Go Home</Link>
    </div>
  );
}
