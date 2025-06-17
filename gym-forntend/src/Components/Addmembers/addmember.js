import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';



const Addmembers = () => {

  const [inputField,setInputField] = useState({name:"",membership:"",mobileNo:"",profilePic:"https://th.bing.com/th/id/OIP.umFoPb6ocy3ou3d-fp_PgQAAAA?rs=1&pid=ImgDetMain", joiningDate:"",address:""});
const [loaderImage,setLoaderImage] = useState(false);
const[membershipList,setMembershipList] = useState([]);
const[selectedOption,setSelectedOption] = useState("");

  const handleOnChange = (event,name)=>{
    setInputField({...inputField,[name]:(event.target.value)});

  }
  console.log(inputField)
  

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
          setInputField({...inputField,['profilePic']:imageUrl })
          setLoaderImage(false)
     }catch(err){
      console.log(err)
      setLoaderImage(false)
     }
    
  }
  const fetchMembership = async()=>{
    await axios.get('http://localhost:5000/plans/get-membership',{withCredentials: true}).then((res)=>{
          // console.log(res);
          setMembershipList(res.data.membership)
          if(res.data.membership.length===0){
            return toast.error("No any Membership added yet",{
              className:"text-lg"
            })

           }else{
            let a = res.data.membership[0]._id; // Access the first membership's _id
            setSelectedOption(a); // Call selectedOption with the _id
            setInputField({ ...inputField, membership: a });
           }

          
          // toast.success(res.data.membership.length + " Membership Fetched");
    }).catch(err=>{
              // const errorMessage =err.response.data.error
               console.log(err);
              toast.error("Somthing Wrong Happened")
            })
  };

  useEffect(()=>{
      fetchMembership()
    },[])
    console.log(inputField)

    const handleOnChangeSelecte = (event)=>{
      let value = event.target.value;
      setSelectedOption(value);
      setInputField({ ...inputField, membership: value });

    };

    const handelRegisterButton=async()=>{
      await axios.post('http://localhost:5000/members/register-member',inputField,{withCredentials: true}).then((response)=>{
        toast.success("Added Successfully");
        setTimeout(() => {
          window.location.reload();
        },2000);

      }).catch(err=>{
        // const errorMessage =err.response.data.error
         console.log(err);
        toast.error("Somthing Wrong Happened")
      })

    }



  return (
    
      <div className='text-black'>
      <div className='grid gap-5 grid-cols-2 text-lg'>
      

      <input value={inputField.name} onChange={(event)=>{handleOnChange(event,"name")}} placeholder='Name of the Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

      <input value={inputField.mobileNo} onChange={(event)=>{handleOnChange(event,"mobileNo")}} placeholder='Mobile No' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

      <input
                value={inputField.address}
                onChange={(event) => handleOnChange(event, "address")}
                placeholder="Enter Address"
                type="text"
                className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
            />
      <input  value={inputField.joiningDate} onChange={(event)=>{handleOnChange(event,"joiningDate")}} type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

      <select value={selectedOption} onChange={handleOnChangeSelecte} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
          {
            membershipList.map((item, index ) =>{
              return (
                <option key={index} value={item._id}>{item.months} Months Membership</option>
              );
            })
          }
          
        </select>
        <input onChange={(e)=>{UploadImage(e)}} type='file' />
        <div className='w-[100px] h-[100px]'>
        
            <img src={inputField.profilePic} className='w-full h-full rounded-full' />
             {
              loaderImage && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
    
             </Stack>
           }
        </div>
        <div onClick={()=>handelRegisterButton()} className='p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Register</div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Addmembers
