import { createContext, useEffect, useReducer } from "react";


export const getallUsersContext=createContext()



const getAllUsersHandler=(state,action)=>{
    switch(action.type){
        case 'load':
            return{...state,load:true,error:null}
        case 'data':
            return{...state,load:false,data:action.payload,error:null}
        case 'error':
            return{...state,load:false,error:action.payload}
        default:
            return state
    }
}



const Usersall=({children})=>{

    const initialState={
        load:true,
        data:null,
        error:null
    }
    const[allUsers,dispatch]=useReducer(getAllUsersHandler,initialState)
    
    
    const getAllUsers=async()=>{
       try {
        dispatch({type:'load'})
        const API=`https://fakestoreapi.com/users`

        const getD=await fetch(API)
        const data=await getD.json()

        dispatch({type:'data',payload:data})
       } catch (error) {
        dispatch({type:'error',payload:'error fetching data'})
       }
    }

    useEffect(()=>{
        getAllUsers()
    },[])
    
    return(
        <getallUsersContext.Provider value={{allUsers,getAllUsers}}>
            {children}
        </getallUsersContext.Provider>
    )
}


export default Usersall