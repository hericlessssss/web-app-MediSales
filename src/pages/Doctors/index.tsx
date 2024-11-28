import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorsList from './DoctorsList';
import DoctorForm from './DoctorForm';
import DoctorDetails from './DoctorDetails';

export default function Doctors() {
  return (
    <Routes>
      <Route index element={<DoctorsList />} />
      <Route path="new" element={<DoctorForm />} />
      <Route path=":id" element={<DoctorDetails />} />
      <Route path=":id/edit" element={<DoctorForm />} />
    </Routes>
  );
}