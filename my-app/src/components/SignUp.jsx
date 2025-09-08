import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";
import Show from '../assets/eye.png';
import Hide from '../assets/hide.png';
import axios from 'axios';

function SignUp(){
    const [name , setName]  = useState('');
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass , setShowPass] = useState(false);
    const [error , setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e,name) =>{
       if(name === 'name'){
            setName (e.target.value); 
            setError(false);
       }
       else if(name === 'email'){
              setEmail(e.target.value);
              setError(false);
       }else{
              setPassword(e.target.value);
              setError(false);
       }
    }
     
    const handleSubmit = async(e) =>{
       e.preventDefault();
       try{
         const  IsEmpty = !name || !email ||!password;
         if(IsEmpty){
              setError("All fields are required");
              return;
         }

       const response = await axios.post('https://e-commerce-1-6nfx.onrender.com/signup',{
              name,email,password
       })
              const {message,status} = response.data;
              
              if(status === 200){
               navigate('/');
              }else{
               setError(message);
              }
       }catch(err){
             setError('Something went wrong. Please try again.');
       }
       }
   

    return(
        <>
        <form  onSubmit={handleSubmit}
               className="d-flex flex-column justify-content-center w-50 mt-4 mb-3" >

        <div className="login">
        <h2 className="text-white mb-0 pe-2" style={{fontStyle:'italic'}}>Let's start your shopping journey. </h2>
        <h6 style={{fontStyle:'normal',color:'white', padding:'20px 0px'}}>Sign Up </h6>
        </div>

        <div className=" SignUp-box d-flex flex-column justify-content-center">

        <div className="w-50">Name : </div>
        <input type="text" 
               className="text-grey rounded-2 border border-grey mb-4 w-75"       
               placeholder="enter name"
               value={name}
               name="name"
               onChange={(e)=>handleChange(e,'name')}/>    

        <div className="w-50">Email : </div>
        <input type="email" 
               className="text-grey rounded-2 border border-grey mb-4 w-75"       
               placeholder="enter email"
               value={email}
               name="email"
               onChange={(e)=>handleChange(e,'email')}/>

        <div className="w-50">Password : </div>
        <div>
        <input type={showPass ? 'text' : 'password'}
               className="text-grey rounded-2 border border-grey mb-1 w-75" 
               placeholder="enter password"
               value={password}
               name="password"
               onChange={(e)=>handleChange(e,'password')}/>
        <img src={showPass ? Hide : Show} 
             onClick = {()=>setShowPass(prev => !prev)} 
             style={{width:'20px' ,height:'20px',position:'relative' , right:'5%' ,bottom:'4%'}}/>
        
        <div style={{color:'red' , fontSize:'14px' , marginBottom:'25px'}}>{error ?  error : ''}</div>
        </div>
        
        <button type="Submit"  className="Submit">Sign Up</button>

        <div className="text-center mt-3">Already have account ? <Link to={'/login'} className="SignUp">Login</Link> </div>          
        </div> 

        </form>
        </>

    )
}

export default SignUp;