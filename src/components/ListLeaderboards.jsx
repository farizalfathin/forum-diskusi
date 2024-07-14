import React from 'react';
import { useSelector } from 'react-redux';

export default function ListLeaderboards() {
  const { data } = useSelector((state) => state.authUser);
  const { list, status, error } = useSelector((state) => state.leaderboards);

  return (
    <div className={`w-full flex flex-col justify-center items-center my-4 gap-4 ${status === 'Loading' && 'h-2/3'}`}>
      { status === 'Loading' ? (<p className="text-xl">Loading....</p>)
        : status === 'Failed' ? (<p className="text-xl">{error}</p>)
          : list.map((user) => (
            <div key={user.user.id} className="w-full flex items-center">
              <img className="w-12 h-12 rounded-full me-2" src={user.user.avatar} alt="" />
              <p className="w-full text-lg">
                {user.user.name === data?.name ? `${user.user.name} (Anda)` : user.user.name}
              </p>
              <p className="text-lg">{user.score}</p>
            </div>
          ))}
    </div>
  );
}
