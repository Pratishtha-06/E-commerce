import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link, useNavigate} from 'react-router-dom';
import { useState ,useContext} from "react";
import Show from '../assets/eye.png';
import Hide from '../assets/hide.png';
import axios from 'axios';
import { UserContext } from "./Context";


function Login(){
   const [showPass , setShowPass] = useState(false);
   const [email , setEmail] = useState('');
   const [password , setPassword] = useState('');
   const [error , setError] = useState(false);
   const navigate = useNavigate();
   const  { login } = useContext(UserContext);

   const handleChange = async(e , name)=>{
    if(name === 'email'){
       setEmail(e.target.value);
       setError(false);
    }else{
       setPassword(e.target.value);
       setError(false);
    }
   }

   const handleSubmit = async(e)=>{
     e.preventDefault();
     try{
      const details = !email || !password;
      if(details){
       setError("All fields are required");
       return;
      }

      const API_URL =import.meta.env.VITE_API_URL;

      const response = await axios.post(`${API_URL}/login`, { 
         email,password
       }, {withCredentials:true});
      const {message} = response.data;
       login(email); 
       navigate('/');
      
      }catch(err){
        if(err.response){
          setError(err.response.data.message);
        }else{
         setError('Something went wrong. Please try again.');
        }  
     }
   }
    return(
        <>
        <form  onSubmit={handleSubmit}
               className="d-flex flex-column justify-content-center w-50 mt-3" 
               style={{height:'450px'}}>

        <div className="login">
        <h1 className="text-white mb-0" style={{fontStyle:'italic'}}>Login </h1>
        <h6 style={{fontStyle:'normal',color:'white', padding:'15px 5px 15px 0px'}}>
         Enjoy exclusive deals and offers ! Get access to you cart.
        </h6>
        </div>

        <div className=" Login-box d-flex flex-column justify-content-center ps-3 ">
        <div className="w-50">Email : </div>
        <input type="email" 
               className="text-grey rounded-2 border border-grey mb-4 w-75"       
               placeholder="enter email"
               value={email}
               name="email"
               onChange={(e)=>handleChange(e,'email')}/>
        <div className="w-50">Password : </div>
        <div className="d-flex">
        <input type={showPass ? 'text' : 'password'}
               className="text-grey rounded-2 border border-grey mb-1 w-75" 
               placeholder="enter password"
               value={password}
               name="password"
               onChange={(e)=>handleChange(e,'password')}/>
        <div className="ms-2"><img src={showPass ? Hide : Show} 
             onClick = {()=>setShowPass(prev => !prev)} 
             style={{width:'20px' ,height:'20px',position:'relative' , right:'5%' ,bottom:'4%'}}/>
         </div>
        </div>

       <div style={{color:'red' , fontSize:'14px' , marginBottom:'25px'}}>{error ?  error : ''}</div>
       
       <button type="Submit" className="Submit">Login</button>
        
        <div className="text-center mt-3">Don't have account ? <Link to={'/signup'} className="SignUp">SignUp</Link> </div>          
        </div>    
        </form>
        </>

    )
}

export default Login;