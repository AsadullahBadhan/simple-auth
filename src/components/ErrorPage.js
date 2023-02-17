import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops! An error occured</h1>
      <p>{error}</p>
    </div>
  );
};

export default ErrorPage;