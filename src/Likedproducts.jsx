import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Likedproducts = () => {
    const navigate=useNavigate()
    const getlikeproducts = useSelector((state) => state.addCart.likes)

    const gotocart=(item)=>{
        navigate(`/products/${item.id}`)
        
    }
    // useEffect(()=>{
    //     gotocart()
    // },[])
    return (
        <>
            {getlikeproducts.length>0?getlikeproducts.map((item) => {
                return (
                    <div className='likep' key={item.id}>
                       
                            <img
                                src={item.image}
                                alt={item.title}
                                className="likedproductimage"
                            />
                       
                        <div className="liedpinfo">
                            <h6 className='likeptitle' title={`${item.title}`}>{item.title}</h6>
                            <small className='likeprice' title={`${item.price}`}>${item.price}</small>
                            <p className="likepdes" title={`${item.description}`}>
                                {item.description.substr(0,40)}..
                            </p>
                            <p className='likedpcat' title={`${item.category}`}>{item.category}</p>
                            {/* <p>{item.id}</p> */}
                            <div className="cartInfocard" onClick={()=>gotocart(item)}>
                                <button className="cartInfocard" title="go to cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-walking" viewBox="0 0 16 16">
                                    <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" />
                                    <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" />
                                </svg></button>
                            </div>
                            <hr />
                        </div>
                        
                    </div>
                )
            }):(<h5 align="center" className='nothingtodisplay'>Nothing to display</h5>)}
        </>
    )
}

export default Likedproducts
