/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { VscListSelection } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiAddLargeLine, RiChatQuoteFill } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';
import { FaUsers } from 'react-icons/fa';
import { logoutOwnUser, setStatusDefault } from '../toolkit/authUser/slices';
import { NotAuthenticated } from './Profile';
import { getAccessToken } from '../utils/api';

export default function TopNav() {
  const { data, status } = useSelector((state) => state.authUser);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const navigate = useNavigate();

  const clickLink = (to) => {
    if (to === '/newThread' && !accessToken) {
      alert('Anda harus login terlebih dahulu');
      return;
    }
    navigate(to);
  };

  const onLogout = () => {
    dispatch(setStatusDefault());
    dispatch(logoutOwnUser());
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-full sticky top-0 md:hidden">
        <div className="flex px-4 py-3 bg-primary-500 text-white gap-3">
          <button
            className="text-2xl"
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-example"
            aria-expanded={drawerOpen}
          >
            <VscListSelection />
          </button>
          <h1 className="text-2xl font-medium">KomuKomu</h1>
        </div>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-primary-900 bg-opacity-20 z-30"
          onClick={toggleDrawer}
        />
      )}

      <div
        id="drawer-example"
        className={`fixed top-0 left-0 z-40 h-screen overflow-y-auto transition-transform md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white w-80 dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <div className="w-full flex justify-between items-center bg-primary-100 px-4 pt-4">
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-4 font-semibold text-secondary-700 text-xl"
          >
            <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
              <path fill="black" d="M28 17H18a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h4v-2h-4v-6h10v6h-2.535l-2.594 3.89L24.535 30l2-3H28a2.002 2.002 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2zM8.667 24.109l.861-.862a.833.833 0 0 1 .899-.184l1.05.42a.833.833 0 0 1 .523.773v1.908a.833.833 0 0 1-.879.834c-7.354-.457-8.84-6.686-9.115-9.072A.832.832 0 0 1 2.834 17h1.874a.834.834 0 0 1 .774.524l.42 1.05a.833.833 0 0 1-.184.898l-.862.861a4.527 4.527 0 0 0 3.81 3.776zM21 9h7v2h-7zm0-4h9v2h-9zm-4 1l-3 2.2V6a2.002 2.002 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V9.8l3 2.2zM4 12V6h8v6z" />
            </svg>
            KomuKomu
          </h5>
          <button
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-example"
            className="text-secondary-900 bg-transparent rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="w-full flex rounded-ee-3xl justify-center items-center bg-primary-100 p-4">
          { status === 'Loading' ? (
            <p>Loading...</p>
          ) : status === 'idle' || status === 'Failed' ? (
            <NotAuthenticated />
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-full mb-2" src={data.avatar} alt={data.name} />
              <p className="text-sm">{data.email}</p>
              <p>{data.name}</p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-4 my-4 px-3">
          <button className="flex justify-start items-center gap-3 text-lg font-medium text-secondary-700" type="button" onClick={() => clickLink('/')}>
            <RiChatQuoteFill />
            <span>Home</span>
          </button>
          <button className="flex justify-start items-center gap-2 text-lg font-medium text-secondary-700" type="button" onClick={() => clickLink('/leaderboards')}>
            <FaUsers />
            <span>Leaderboards</span>
          </button>
          <button className="flex justify-start items-center gap-2 text-lg font-medium text-secondary-700" type="button" onClick={() => clickLink('/')}>
            <RiAddLargeLine />
            <span>Add New Thread</span>
          </button>
          <button className="flex justify-start items-center gap-2 text-lg font-medium text-secondary-700" type="button" onClick={onLogout}>
            <IoMdLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
