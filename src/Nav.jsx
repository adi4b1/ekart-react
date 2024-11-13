import { Link } from "react-router-dom"


import { useSelector } from "react-redux"



const Nav = () => {
    const count = useSelector((state) => state.addCart.cart.length)
    return (
        <>
            <div>
                <ul className="navul">
                    <div className="navulChild">
                        <Link to="/" className="no-underline">
                            <li>eKart</li>
                        </Link>

                    </div>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg> &nbsp;likes
                    </li>
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
                </ul>
            </div>
        </>
    )
}

export default Nav