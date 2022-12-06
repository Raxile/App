import { useRef,useCallback,useState,useEffect } from "react";

export const useHttpClient = ()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest =useCallback( async (url,method='GET',body = null,headers={})=>{
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl)
        try {
            const response= await fetch(url,{
                method,
                body,
                headers,
                signal:httpAbortCtrl.signal
            });
            console.log(response)
            const responseData = await response.json();
            console.log(responseData)
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl!==httpAbortCtrl);

            if(!response.ok){         
              throw new Error(responseData.message);
            }     

            setIsLoading(false);
            return responseData;
        } catch (err) { 
            console.log(err.message);
            setError(err.message);
            setIsLoading(false);
            throw err;
          }
       
    },[]);

    const clearError =()=>{
      setError(null);
    };
    
    useEffect(()=>{
        return ()=>{
            // eslist-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl=>abortCtrl.abort());
        };
    },[])

   return {isLoading,error,sendRequest ,clearError};
};