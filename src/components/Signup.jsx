import React, { useState } from 'react';
import authService from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { Button, Input, Logo, Spinner } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setError('');
    try {
      setLoading(true);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        toast.success("Successfully signed up and logged in!");
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div
        className={`mx-auto w-[95%] max-w-lg backdrop-blur-md bg-bkg-secondary/40 rounded-xl p-10 border border-text-secondary/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-text-primary/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register('name', {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full font-medium text-bkg-primary"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
      {loading && (
        <div className="w-full py-3">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Signup;
