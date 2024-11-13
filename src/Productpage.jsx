import React, { useContext, useEffect, useReducer } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import { removeProduct, addProduct } from "./Redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { ApireducerContext } from "./context/Apireducer";
import { toast } from 'react-toastify';

const Productpage = () => {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const { apiData, getIndividualPersonData } = useContext(ApireducerContext);
  // console.dir("apiData", typeof apiData);

  const original_id = Number(cartId);
  // console.log(typeof original_id);
  // console.dir(original_id);
  const dis = useDispatch()

  const reducerFunctionProduct = (state, action) => {
    switch (action.type) {
      case "load":
        return { ...state, load: true, error: null };
      case "data":
        return { ...state, load: false, data: action.payload, error: null };
      case "error":
        return { ...state, load: false, error: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    load: true,
    data: null,
    error: null,
  };

  const [getsingleProduct, dispatch] = useReducer(
    reducerFunctionProduct,
    initialState
  );
  const getProduct = async () => {
    dispatch({ type: "load" });
    try {
      const API = `https://fakestoreapi.com/products/${original_id}`;
      const getData = await fetch(API);
      const cd = await getData.json();
      // console.log("sdfsdf", cd);

      dispatch({ type: "data", payload: cd });
    } catch (error) {
      dispatch({ type: "error", payload: "error fetching data" });
    }
  };
  const addToCart = useSelector((state) => state.addCart.cart)
  console.log("getsingleProduct", addToCart);


  const inCart = addToCart ? addToCart.some((product) => product.id === original_id) : ''
  console.log(inCart);
  useEffect(() => {
    getProduct();
  }, [original_id]);

  const getwithoutcurrentid = apiData.data
    ? apiData.data.filter((item) => item.id != original_id)
    : [];

  const handleAddcart = (it) => {
    dis(addProduct(it))
    toast.success(`${getsingleProduct.data.title} is added to cart!😀`);
  }

  const gotoCart=()=>{
    
    navigate('/cart')
  }
  return (

    < div >
      <div className="productDisplayBoard">
        <div className="firstfirstChild">
          <div>
            {getsingleProduct.error && "error fetch data"}

            {getsingleProduct.load && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!getsingleProduct.load && getsingleProduct.data && (


              <div className="firstChildmatter">
                <div>
                  <img
                    src={getsingleProduct.data.image}
                    alt={getsingleProduct.data.title}
                    className="firstChildImage"
                  />
                </div>
                <div className="Info">
                  <h6>{getsingleProduct.data.title}</h6>
                  <p>Price: ${getsingleProduct.data.price}</p>
                  <p className="des">
                    Description: {getsingleProduct.data.description}
                  </p>

                  <p>Category: {getsingleProduct.data.category}</p>
                  {/* <p>{getsingleProduct.data.id}</p> */}
                  <div className="cartInfocard">

                    {inCart ? (<button className="addRemoveButsinglepro" onClick={() => dis(removeProduct(getsingleProduct.data.id))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-dash" viewBox="0 0 16 16">
                      <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg> &nbsp;Product</button>)
                      : (<button className="addRemoveButsinglepro" onClick={() => handleAddcart(getsingleProduct.data)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg> &nbsp;Cart</button>)}
                    <button className="addRemoveButsinglepro" onClick={gotoCart}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-walking" viewBox="0 0 16 16">
                      <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" />
                      <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" />
                    </svg> &nbsp;Cart</button>

                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
        {/* second row */}
        <div>
          <div>
            <h6>Related products</h6>
            <div className="secondRow">
              {apiData.error && "error fetch data"}

              {apiData.load && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div>
                {!apiData.load &&
                  apiData.data &&
                  getwithoutcurrentid.map((item, index) => {
                    return (
                      <Link
                        key={item.id}
                        className="no-underline"
                        to={`/products/${item.id}`}
                      >
                        <div className="mainprodis">
                          <div>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="imageinsinglepro"
                            />
                          </div>
                          <div>
                            <h6>{item.title}</h6>
                            <small>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-currency-rupee"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                              </svg>{" "}
                              &nbsp;${item.price}
                            </small>
                            <br />
                            <small>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-journal-text"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                              </svg>{" "}
                              &nbsp;{item.description.substr(0, 50)}...
                            </small>
                            <br />
                            <small>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-tag"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                                <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                              </svg>{" "}
                              &nbsp;{item.category}
                            </small>
                            <hr />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Productpage;
