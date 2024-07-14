import React from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';

export default function RegisterInput({ onRegister }) {
  const [registerInput, setRegisterInput] = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <form>
      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <div className="relative">
          <input autoComplete="off" id="name" name="name" value={registerInput.name} onChange={(e) => setRegisterInput(e, 'name')} type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-primary-300 text-secondary-700 focus:outline-none focus:border-primary-600" placeholder="Name" />
          <label htmlFor="name" className="absolute left-0 -top-3.5 text-secondary-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-secondary-600 peer-focus:text-sm">Name</label>
        </div>
        <div className="relative">
          <input autoComplete="off" id="email" name="email" value={registerInput.email} onChange={(e) => setRegisterInput(e, 'email')} type="email" className="peer placeholder-transparent h-10 w-full border-b-2 border-primary-300 text-secondary-700 focus:outline-none focus:border-primary-600" placeholder="Email Address" />
          <label htmlFor="email" className="absolute left-0 -top-3.5 text-secondary-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-secondary-600 peer-focus:text-sm">Email Address</label>
        </div>
        <div className="relative">
          <input autoComplete="off" id="password" name="password" value={registerInput.password} onChange={(e) => setRegisterInput(e, 'password')} type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-primary-300 text-secondary-700 focus:outline-none focus:border-primary-600" placeholder="Password" />
          <label htmlFor="password" className="absolute left-0 -top-3.5 text-secondary-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-secondary-600 peer-focus:text-sm">Password</label>
        </div>
        <div className="relative">
          <input autoComplete="off" id="confirmPassword" name="confirmPassword" value={registerInput.confirmPassword} onChange={(e) => setRegisterInput(e, 'confirmPassword')} type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-primary-300 text-secondary-700 focus:outline-none focus:border-primary-600" placeholder="Confirm Password" />
          <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-secondary-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-secondary-600 peer-focus:text-sm">Confirm Password</label>
        </div>
        <div>
          <button type="button" onClick={() => onRegister(registerInput)} className="bg-primary-500 text-white rounded-md px-2 py-1">Register</button>
        </div>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
