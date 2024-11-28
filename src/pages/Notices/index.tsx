import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticesList from './NoticesList';
import NoticeForm from './NoticeForm';
import NoticeDetails from './NoticeDetails';

export default function Notices() {
  return (
    <Routes>
      <Route index element={<NoticesList />} />
      <Route path="new" element={<NoticeForm />} />
      <Route path=":id" element={<NoticeDetails />} />
      <Route path=":id/edit" element={<NoticeForm />} />
    </Routes>
  );
}