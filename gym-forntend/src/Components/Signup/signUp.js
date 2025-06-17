import React , {useState}from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import axios from 'axios';
import { Upload } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {

    const [forgotPassword, setForgotPassword] = useState(false);
    const [inputField,setInputField] = useState({gymName:"",email:"",userName:"",password:"",phoneNumber:"",address:"",profilePic:"https://th.bing.com/th/id/OIP.nR9TWva4D7xCnlUK9HU4BgHaE8?rs=1&pid=ImgDetMain"});
     const [loaderImage,setLoaderImage] = useState(false);
    const handleClose=()=> {
        setForgotPassword(prev=>!prev)
    }

    const handleOnChange = (event,name)=>{
      setInputField({...inputField,[name]:(event.target.value)});

    }
    // console.log(inputField)
    
    const UploadImage = async(event)=>{

      setLoaderImage(true)
      console.log("image uploading")
       const files = event.target.files;
       const data = new FormData();
       data.append('file',files[0]);
       //dvwxk6sdo
       data.append('upload_preset','gym-management');
       try{
            const response = await axios.post("https://api.cloudinary.com/v1_1/dvwxk6sdo/image/upload",data);
            console.log(response)
            const imageUrl = response.data.url;
            setLoaderImage(false)

            setInputField({...inputField,['profilePic']:imageUrl })
       }catch(err){

        console.log(err)
        setLoaderImage(true)
       }
      
    }


  
    const handleRegister = async()=> {
     await axios.post('http://localhost:5000/auth/register',inputField).then((resp)=>{
      
      const successMsg = resp.data.message;
      toast.success(successMsg);
      // console.log(resp);
      }).catch(err=>{
                const errorMessage =err.response?.data?.error;
                //  console.log(errorMessage)
                toast.error(errorMessage);
              });

    }

  return (
   
      <div className='customSignUp w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450pxl] overflow-y-auto'>
           <div className='font-sans text-white text-center text-3xl'>Register My GYM</div>
           <input type='text' value={inputField.email} onChange={(event)=>{handleOnChange(event,"email")}} className='w-full my-10 p-2 rounded-lg' placeholder='Enter Email'/>
           <input type='text' value={inputField.gymName}  onChange={(event)=>{handleOnChange(event,"gymName")}}className='w-full mb-10 p-2 rounded-lg' placeholder='Enter GYM Name'/>
           <input type='text' value={inputField.userName} onChange={(event)=>{handleOnChange(event,"userName")}} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter UserName'/>
           {/* <input type='text' value={inputField.phoneNumber} onChange={(event)=>{handleOnChange(event,"phoneNumber")}} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Phone Number'/> */}
           <input type='password' value={inputField.password} onChange={(event)=>{handleOnChange(event,"password")}} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Passowrd'/>
           {/* <input type='text' value={inputField.address} onChange={(event)=>{handleOnChange(event,"address")}} className='w-full mb-10 p-5  rounded-lg' placeholder='Enter Adddress'/> */}
          
          <input type='file' onChange={(e)=>{UploadImage(e)}} className='w-full mb-10 p-2 rounded-lg' />
           {
            loaderImage && <Box sx={{ display: 'flex' }}>
            <CircularProgress />
           </Box>
          
           }
           <img src={inputField.profilePic} className='mb-10 h-[250px] w-[250px] rounded-lg'/>

           <div className='p-2 w-[80%] border-1 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={()=>handleRegister()}>Register</div>
           <div className='p-2 w-[80%] mt-5 border-1 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={()=>handleClose()}>Forgot Password</div>
             {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword />} />}
             <ToastContainer />
    </div>
  )
}

export default SignUp
