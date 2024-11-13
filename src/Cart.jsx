import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import { removeProduct ,addMore,removeitemfromaddMore} from "./Redux/cartSlice";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.addCart.cart);
//   console.log(cartItems);
const dis=useDispatch()
  const totalCost=cartItems.reduce((acc,curr)=>acc+curr.price,0)
// console.log('sdsd',addMore.sameitemcart);

  const addMoresameItems=useSelector((state)=>state.addCart.sameitemcart)
// console.log(addMoresameItems);

  const totalCostForSameProduct=addMoresameItems.reduce((acc,curr)=>acc+curr.price,0)
//   console.log('ttoa;',totalCostForSameProduct);

  const dmi=(item)=>{
    let res=addMoresameItems.map((j)=>{
        
        return j       
    })
    console.log('res',res.length-1);
    
    
    dis(removeitemfromaddMore(res.id))
  }

  
  
//   const handleremovecart=(item)=>{
//     dispatch(removeProduct(item.id))
//   }

// const addMoreSameProductItems=(item)=>{
//     dis(addMore(item))
// }
  return (
    <div className="cartmaindisplay">
      <div>
        { cartItems.length>0?cartItems.map((item, index) => {
          return (
            <div className="cartBody">
              <div className="cartBodyChild">
                <div>
                  <img
                    src={item.image}
                    alt=""
                    srcset=""
                    className="cartImageinCart"
                  />
                </div>
                <div>
                  <p>{item.title}</p>
                  <small>{item.description}</small>
                  <br />
                  <button onClick={()=>dis(addMore(item))}>+</button><br />
                  <button onClick={()=>dmi(item)}>-</button>
                  <p>total price{parseInt(totalCostForSameProduct)}</p>
                  <button className="addRemoveBut" onClick={()=>dis(removeProduct(item.id))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg> &nbsp;Remove</button>
                </div>
              </div>
            </div>
          );
        }):<EmptyCart/>}
       {cartItems.length<1?(
         <Link to="/"><h4>Go to Products</h4></Link>
       ):''}
      </div>
      <div className="cartInfoClass">
        <div>
          <h5>CartItems({cartItems.length})</h5>
          <h6>Total : {parseInt(totalCost)}</h6>
        </div>
      </div>
    </div>
  );
};

export default Cart;
