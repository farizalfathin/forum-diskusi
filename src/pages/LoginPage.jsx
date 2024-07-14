import React, { useEffect } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../toolkit/authUser/thunks';
import LoginInput from '../components/LoginInput';
import { setStatusDefault } from '../toolkit/authUser/slices';

export default function LoginPage() {
  const { status } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'Success') {
      dispatch(setStatusDefault());
      navigate('/');
    }
  }, [status]);

  function onLogin({ email, password }) {
    dispatch(loginUserThunk({ email, password }));
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col mx-auto justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="absolute top-6 left-6 text-3xl text-primary-500">
            <Link to="/">
              <IoArrowBackCircle />
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Login</h1>
            <div className="divide-y divide-primary-300">
              <LoginInput onLogin={() => onLogin} />
            </div>
            <p>
              Don&apos;t have an account?
              <Link className="text-primary-500" to="/register"> Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
