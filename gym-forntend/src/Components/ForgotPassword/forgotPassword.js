import React, {useState} from 'react'
import Loader from '../Loader/loader'
// import { sendOtp } from '../../../../Controllers/gym'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';





const ForgotPassword = () => {
     const [emailSubmit,setEmailSubmit] = useState(false)
     const [otpValidate,setOtpValidate] = useState(false)
     const [contentVal,setContentValue] = useState("Submit Your Email ID")
     const [inputField,setInputField] = useState({email:"",otp:"",newPassword:""});
      const[loader,setLoader] = useState(false)
          const handleSubmit =()=>{
            if(!emailSubmit){
                //  setEmailSubmit(true)
                //  setContentValue("Submit Your OTP")

                sendOtp();


                
            }else if(emailSubmit && !otpValidate){
                

                verifyOTP();
            }else{
              changePassword();
            }
          }

          const changePassword =async()=>{
            await  axios.post('http://localhost:5000/auth/reset-password',{email:inputField.email,newPassword:inputField.newPassword}).then((response)=>{
              setLoader(true);
                
                toast.success(response.data.message);
                setLoader(false)

           }).catch(err=>{
            toast.error("Some technical issue while sending Mail");

            console.log(err);
            setLoader(false)

                    
                  });
          }

          const verifyOTP = async()=>{
            setLoader(true);
            await  axios.post('http://localhost:5000/auth/reset-password/checkOtp',{email:inputField.email,otp:inputField.otp}).then((response)=>{
               setOtpValidate(true)
                 setContentValue("Submit Your New Password")
                 toast.success(response.data.message);
                 setLoader(false)

            }).catch(err=>{
                toast.error("Some technical issue while sending Mail");

                console.log(err);
                setLoader(false)

                        
                      });
            

          }

          const sendOtp = async()=>{
            await  axios.post('http://localhost:5000/auth/reset-password/sendOtp',{email:inputField.email}).then((response)=>{
              
               setEmailSubmit(true)
                 setContentValue("Submit Your OTP")
                 setLoader(false)

              

              toast.success(response.data.message);
              
              }).catch(err=>{
                toast.error("Some technical issue while sending Mail");

                console.log(err);
                setLoader(false)

                        
                      });

          } 



          const handleOnChange = (event,name)=>{
            setInputField({...inputField,[name]:(event.target.value)});
      
          }
          console.log(inputField)

  return (
            <div>
                <div className='w-full'>
                    <div className='w-full mb-5'>
                    <div>Enter Your Email</div>
                    <input type='text' value={inputField.email} onChange={(event)=>{handleOnChange(event,"email")}}  className='w-1/2 p-2 rounded-lg border-2 border-slate-400 ' placeholder='Enter Email'/>
                    </div>
                    
                    {
                        emailSubmit && <div className='w-full mb-5'>
                    <div>Enter Your OTP</div>
                    <input type='text' value={inputField.otp} onChange={(event)=>{handleOnChange(event,"otp")}} className='w-1/2 p-2 rounded-lg border-2 border-slate-400 ' placeholder='Enter OTP'/>
                    </div>
                    }
                    {
                        otpValidate && <div className='w-full mb-5'>
                    <div>Enter Your New Passowrd</div>
                    <input type='password' value={inputField.newPassword} onChange={(event)=>{handleOnChange(event,"newPassword")}} className='w-1/2 p-2 rounded-lg border-2 border-slate-400 ' placeholder='Enter New Password'/>
                    </div>
                    }
                    <div className=' bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black' onClick={()=>handleSubmit()}>{contentVal}</div>
               
                </div>
               {loader && <Loader/>}
               <ToastContainer />
            </div>
         )
}

export default ForgotPassword
