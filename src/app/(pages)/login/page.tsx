'use server';

import { Suspense } from 'react';
import { createUser, getAllUsers } from "../../lib/actions";
import CreateUserCard from '../../ui/createCards/CreateUserCard';
import LoginForm from '../../ui/forms/login-form';


export default async function LoginPage() {

  const users = await getAllUsers();

  return (
    <div>
        <LoginForm/>
    </div>
  );
}

