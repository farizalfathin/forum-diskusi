import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getLeaderboardsThunk from '../toolkit/leaderboards/thunks';
import ListLeaderboards from '../components/ListLeaderboards';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboardsThunk());
  }, []);

  return (
    <section className="w-full min-h-screen max-w-screen-md bg-white px-4 md:px-8 pt-6 overflow-y-auto">
      <h1 className="hidden text-4xl mb-6 md:block">KomuKomu</h1>
      <h3 className="text-2xl font-medium">Klasmen Pengguna Aktif</h3>
      <ListLeaderboards />
    </section>
  );
}
