import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  const token = localStorage.getItem('ACCESS_TOKEN');
  
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  
  return (
    <div>
      <Outlet/>
    </div>
  );
}