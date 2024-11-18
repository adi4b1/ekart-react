import { Link } from "react-router-dom"


import { useSelector } from "react-redux"
import { useState } from "react"
import Likedproducts from "./Likedproducts"



const Nav = () => {
    const [likemodal, setlikemodal] = useState(false)
    const count = useSelector((state) => state.addCart.cart.length)
    const getlikeproducts = useSelector((state) => state.addCart.likes)

    const[mover,setmover]=useState(false)

    // console.log('length',getlikeproducts.length);
    const handleModalOpen = () => {
        setlikemodal(!likemodal)
    }

    const mouseover=()=>{
        setmover(true)
    }
    const mouseleave=()=>{
        setmover(false)
    }
    return (
        <>
            <div style={{ position: 'relative' }}>
                <ul className="navul">
                    <div className="navulChild">
                        <Link to="/" className="no-underline">
                            <li>eKart</li>
                        </Link>

                    </div>
                    <div className="forsecondblocknavs">

                   
                    <div className="cartCountInNotifi">
                        <li onClick={handleModalOpen}
                        onMouseLeave={mouseleave}
                        onMouseEnter={mouseover}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg>

                            <div className="notifilikecount">
                                <small>{getlikeproducts.length > 9 ? (`9⁺`) : (getlikeproducts.length)}
                                </small>
                            </div>
                            {mover&&(
                                <div className="titlepopover">
                                    <small className="titlepoplikedtext">Liked Products</small>
                                </div>
                            )}

                            {likemodal && (
                                <div className="forlikesModal">
                                    {/* liked products components */}
                                    <Likedproducts />
                                </div>
                            )}
                        </li>
                    </div>

                    <Link to="/cart" className="no-underline">
                        <div className="cartCountInNotifi">
                            <li>&nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg></li>
                            <div className="notificartChild">
                                <small>{count > 9 ? (`9⁺`) : (count)}</small>
                            </div>
                        </div>

                    </Link>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default Nav