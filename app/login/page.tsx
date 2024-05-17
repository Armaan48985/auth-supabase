'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter()

  const login = async () => {
    try {
      let { data: dataUser, error } = await supabase
        .auth
        .signInWithOtp({
          email: data.email,
          options: {
            shouldCreateUser: true
          }
        })

      if (dataUser) {
        setSuccess(true);
      }

    } catch (error) {
      console.log(error)
    }
    console.log('clicke')
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  const loginwithGoogle = async (response:any) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })

    } catch (error) {
      console.log(error)
    }
  }

  return <div className="container mx-auto w-[400px] grid gap-4">
    <div className='grid'>
      <label>Email</label>
      <input
        type='text'
        name='email'
        value={data?.email}
        onChange={handleChange}
      />
    </div>
    {/* <div className='grid'>
      <label>Password</label>
      <input
        type='password'
        name='password'
        value={data?.password}
        onChange={handleChange}
      />
    </div> */}
    {success && <div className="my-4 bg-green-100 px-2 text-green-600">An email has been sent to {data.email} to login.</div>}
    <div>
      <button className="px-4 py-2 bg-blue-500 rounded cursor-pointer" onClick={login}>Login</button>
      <button className="bg-white text-black p-2 rounded-lg mt-10" onClick={loginwithGoogle}>Sign In with google</button>
    </div>
  </div>;
}