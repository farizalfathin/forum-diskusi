import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllThreadsThunk } from '../toolkit/threads/thunks';
import ThreadsList from '../components/ThreadsList';
import AllCategories from '../components/AllCategories';
import getAllUsersThunk from '../toolkit/users/thunks';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllThreadsThunk());
    dispatch(getAllUsersThunk());
  }, []);

  return (
    <section className="w-full min-h-screen lg:max-w-screen-md bg-white px-4 md:px-8 pt-6 overflow-y-auto">
      <h1 className="hidden text-4xl mb-6 md:block">KomuKomu</h1>
      <h3 className="text-2xl mb font-medium">Diskusi Terkini</h3>
      <AllCategories />
      <ThreadsList />
    </section>
  );
}
