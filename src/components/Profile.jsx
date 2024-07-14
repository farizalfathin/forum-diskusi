import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import PropTypes from 'prop-types';
import { logoutOwnUser, setStatusDefault } from '../toolkit/authUser/slices';

export default function Profile() {
  const { data, status } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setStatusDefault());
    dispatch(logoutOwnUser());
  };

  return (
    <div className="w-full flex justify-center items-center bg-white rounded-md mt-4 min-h-48">
      { status === 'Loading' ? (
        <p>Loading...</p>
      ) : status === 'idle' || status === 'Failed' ? (
        <NotAuthenticated />
      ) : (
        <Authenticated
          avatar={data.avatar}
          name={data.name}
          email={data.email}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}

export function NotAuthenticated() {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-7xl text-secondary-300 mb-2"><FaUserCircle /></span>
      <p className="text-lg mb-2">wanna create your Thread ?</p>
      <Link className="flex bg-primary-500 text-white gap-2 justify-center items-center p-1 rounded-md hover:bg-primary-700" to="/login">
        <IoMdLogIn />
        Login
      </Link>
    </div>
  );
}

export function Authenticated({
  avatar, email, name, onLogout,
}) {
  return (
    <div className="w-full">
      <div className="w-full bg-primary-100 flex flex-col items-center justify-center py-4 border-b border-primary-300 rounded-t-md">
        <img className="w-20 h-20 rounded-full mb-2" src={avatar} alt="" />
        <p className="text-sm">{email}</p>
        <p>{name}</p>
      </div>
      <div className="py-2 ps-2">
        <button
          className="flex gap-2 p-1 items-center rounded transition duration-300 ease-in-out hover:bg-secondary-100"
          type="button"
          onClick={onLogout}
        >
          <IoMdLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

Authenticated.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};
