import React from 'react'
import Login from '../../Components/Login/login'
import SignUp from '../../Components/Signup/signUp'

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
      <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-x2'>
        Welcome To GYm Management System
      </div>
      <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://c4.wallpaperflare.com/wallpaper/692/659/618/man-workout-gym-working-wallpaper-preview.jpg")]'>
         <div className='w-full lg:flex gap-32'>
          <Login />
          <SignUp />






        </div>

      </div>
    </div>
  )
}

export default Home
