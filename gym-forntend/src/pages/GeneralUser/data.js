import axios from "axios";

const getMonthlyJoined = async () => {
    try{
        const response = await axios.get('http://localhost:5000/members/monthly-members',{withCredentials:true});
    return response.data;
    } catch(error){
         console.error('Error fetching data:',error);
         throw error;
    }
}

const threeDayExpire = async () => {
    try{
        const response = await axios.get('http://localhost:5000/members/within-3-days-expiring',{withCredentials:true});
    return response.data;
    } catch(error){
         console.error('Error fetching data:',error);
         throw error;
    }
}


const fourToSevenDaysExpire = async () => {
    try{
        const response = await axios.get('http://localhost:5000/members/within-4-7-days-expiring',{withCredentials:true});
    return response.data;
    } catch(error){
         console.error('Error fetching data:',error);
         throw error;
    }
}

const expired = async () => {
    try{
        const response = await axios.get('http://localhost:5000/members/expired-member',{withCredentials:true});
    return response.data;
    } catch(error){
         console.error('Error fetching data:',error);
         throw error;
    }
}
const inActiveMembers = async () => {
    try{
        const response = await axios.get('http://localhost:5000/members/inactive-member',{withCredentials:true});
    return response.data;
    } catch(error){
         console.error('Error fetching data:',error);
         throw error;
    }
}



export {getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire,expired,inActiveMembers};