import React, {useEffect} from "react";
import axios from "axios";
import Loader from "../micro/loader";

const checkRequests= Wrapped => {
    function CheckRequests(props) {
        useEffect(()=>{
            axios.interceptors.response.use(response =>{
                // Do something with response data
                console.log(response);
                return response;
            },  error => {
                switch (error.response.status) {
                    case 503 :
                        // Render Maintenance message
                        return <Loader loading="true" src="https://8bitjohn.com/wp-content/uploads/2019/09/maintenance.gif"/>
                                
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