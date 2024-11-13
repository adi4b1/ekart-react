import React, { createContext, useEffect, useReducer } from 'react'

export const ApireducerContext=createContext()

const apiDataHandler=(state,action)=>{
    switch(action.type){
        case 'load':
            return{...state,load:true,error:null}
        case 'data':
            return {...state,load:false,data:action.payload,error:null}
        case 'error':
            return{...state,load:false,error:action.payload}
        default:
            return state
    }
}
const Apireducer = ({children}) => {
   

    const initialState={
        load:true,
        data:null,
        error:null,
    }


    const[apiData,dispatch]=useReducer(apiDataHandler,initialState)

    
    const getapiData=async()=>{
        try{
            dispatch({type:"load"})
            const API=`https://fakestoreapi.com/products`
            const fetchapiData=await fetch(API)

            const convertproData=await fetchapiData.json()
            // console.log('indpersondet',convertIndData);
            
            dispatch({type:'data',payload:convertproData})
        }catch(error){

            dispatch({type:'error',payload:'errror fetching  data'})
        }
    }
    // console.log('indpersondet',apiData);
    
 useEffect(()=>{
  getapiData()
 },[])
    return (
    <ApireducerContext.Provider value={{apiData,getapiData}}>
        {children}
    </ApireducerContext.Provider>
  )
}

export default Apireducer