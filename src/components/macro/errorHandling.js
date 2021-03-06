import React, {useEffect} from "react";
import axios from "axios";
import Loader from "../micro/loader";

const checkRequests= Wrapped => {
    function CheckRequests(props) {
        useEffect(()=>{
            axios.interceptors.response.use(response =>{
                // Do something with response data
                console.log(response);
                
            },  error => {
                switch (error.response.status) {
                    case 503 :
                        // Render Maintenance message
                        return <Loader loading="true" src="https://8bitjohn.com/wp-content/uploads/2019/09/maintenance.gif">
                                <h1 style={{marginTop:`4em`,fontSize:`40px`,alignSelf:`center`,position:`absolute`,top:`70vh`}}>We'll be back shortly....</h1>
                                </Loader>
                                
                    default :
                        break
                }
                // Do something with response error
                return Promise.reject(error);
            });
        })

        return (  
                 
                <Wrapped {...props} />
                
            
        )   
    }
    return CheckRequests
}

export default checkRequests