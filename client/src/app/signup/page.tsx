'use client';

import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const {
    value: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    onChange: nameOnChange,
    onBlur: nameOnBlur,
  } = useInput((value) => value.trim() !== '');

  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
  } = useInput((value) => value.trim() !== '' && emailRegex.test(value));

  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
  } = useInput((value) => value.length > 2);

  const {
    value: passwordConfirm,
    hasError: passwordConfirmHasError,
    isValid: passwordConfirmIsValid,
    onChange: passwordConfirmOnChange,
    onBlur: passwordConfirmOnBlur,
  } = useInput((value) => value === password);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerErrorMessage('');
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordConfirmIsValid
    ) {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
            passwordConfirm,
          }),
        });

        const data = await res.json();
        // console.log(data);

        if (data.error) {
          throw data.error;
        }

        // router.push('/onboarding');
      } catch (error) {
        // console.log(error);
        if (error.errorObj.code === 11000) {
          setServerErrorMessage(`! user already exists`);
        } else {
          setServerErrorMessage(error.msg);
        }
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="form">
        <div className="flex w-80 flex-col gap-3">
          <input
            className="rounded border border-primary bg-inherit px-4 py-2 focus:outline-none"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={nameOnChange}
            onBlur={nameOnBlur}
          />
          {nameHasError && <p>! can't be empty</p>}

          <input
            className="rounded border border-primary bg-inherit px-4 py-2 focus:outline-none"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={emailOnChange}
            onBlur={emailOnBlur}
          />
          {emailHasError && <p>! need to be valid email</p>}

          <input
            className="rounded border border-primary bg-inherit px-4 py-2 focus:outline-none"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={passwordOnChange}
            onBlur={passwordOnBlur}
          />
          {passwordHasError && <p>! must be 2 or more</p>}

          <input
            className="rounded border border-primary bg-inherit px-4 py-2 focus:outline-none"
            type="password"
            name="passwordConfirm"
            placeholder="passwordConfirm"
            value={passwordConfirm}
            onChange={passwordConfirmOnChange}
            onBlur={passwordConfirmOnBlur}
          />
          {passwordConfirmHasError && <p>! password don't match</p>}

          {serverErrorMessage && <p>{serverErrorMessage}</p>}
          <button
            type="submit"
            className="rounded border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
