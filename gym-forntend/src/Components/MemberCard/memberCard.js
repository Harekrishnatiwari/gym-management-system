import React from 'react'
import Brightness1SharpIcon from '@mui/icons-material/Brightness1Sharp';
import { Link } from 'react-router-dom';

const MemberCard = ({item}) => {
  return (
    <Link to={`/member/${item?._id}`} className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  hover:text-white cursor-pointer ">
    <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
      <img className="w-full h-full rounded-full" src={item?.profilePic} alt="Profile Pic" />
      <Brightness1SharpIcon className='absolute top-0 left-2' sx={{color: item?.status==="Active"?"greenyellow":"red"}}/>
    </div>
    <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono">Name:{item?.name}

    </div>
    <div className="mx-auto mt-2 text-center text-xl  font-mono">MobileNo:{"+91 "+ item?.mobileNo}
    </div>
    <div className="mx-auto mt-2 text-center text-xl  font-mono">Next Bill Date:{item?.nextBillDate.slice(0,10).split('-').reverse().join('-')}
    </div>
  </Link>
  )
}

export default MemberCard
