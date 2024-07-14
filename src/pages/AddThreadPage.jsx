import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddThread from '../components/AddThread';
import { createNewThreadThunk } from '../toolkit/threads/thunks';

export default function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddThread = ({ title, body, category }) => {
    dispatch(createNewThreadThunk({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="w-full min-h-screen overflow-y-auto max-w-screen-md bg-white mx-auto pt-8 px-8">
      <h1 className="text-3xl font-medium">Buat Diskusi Baru</h1>
      <AddThread onAddThread={onAddThread} />
    </section>
  );
}
