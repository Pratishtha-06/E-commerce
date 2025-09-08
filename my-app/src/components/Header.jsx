import React, { useEffect, useState } from "react";
import '../App.css';
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "./Context";


function Header(){
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleSize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleSize);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleSize);
    }, []);

    const handleAccount = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/account');
        }
    };
    return (
        <>
        {windowSize.width > 786 ? (
         <div className="header d-flex flex-row justify-content-between p-4">
            <h4>Welcome !</h4>
            <div className="d-flex flex-row">
                <Link to={'/'} className="Link me-5">Home</Link>
                <Link to={'/'} className="Link me-5">WishList</Link>
                <Link to={'/cart'} className="Link me-5">My Cart</Link>
                <Link to={'/'} className="Link me-5">My Orders</Link>
                <div  onClick={handleAccount} className="Link me-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'30px' , height:'30px',cursor:'pointer'}}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                     </svg>
                </div>
            </div>
         </div>
         ):(
            <div className="header d-flex flex-row justify-content-between p-4">
                <div className="d-flex flex-row">
                <Link to={'/'} className="Link me-5">Home</Link>
                <Link to={'/'} className="Link me-5">WishList</Link>
                <Link to={'/cart'} className="Link me-5">My Cart</Link>
                <Link to={'/'} className="Link me-5">My Orders</Link>
                <div  onClick={handleAccount} className="Link me-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'30px' , height:'30px',cursor:'pointer'}}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                     </svg>
                </div>
            </div>

            </div>
         )}
        </>
    )
}
export default Header;