import React, { useEffect } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../toolkit/authUser/thunks';
import RegisterInput from '../components/RegisterInput';
import { setStatusDefault } from '../toolkit/authUser/slices';

export default function RegisterPage() {
  const { status } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'Success') {
      dispatch(setStatusDefault());
      navigate('/login');
    }
  }, [status]);

  const onRegister = ({ name, email, password }) => {
    dispatch(registerUserThunk({ name, email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col mx-auto justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="absolute top-6 left-6 text-3xl text-primary-500">
            <Link to="/login">
              <IoArrowBackCircle />
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <div className="divide-y divide-primary-300">
              <RegisterInput onRegister={onRegister} />
            </div>
            <p>
              Already have an account?
              <Link className="text-primary-500" to="/login"> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
