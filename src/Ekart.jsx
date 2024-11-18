import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from 'react-toastify';

import {
  addProduct, removeProduct,
  likeproduct, dislikeproduct

} from "./Redux/cartSlice";
import EmptyCart from "./EmptyCart";
const reducerHandler = (state, action) => {
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

const Ekart = () => {

  const notify = () => toast("Product is add successfully😀");
  const initialState = {
    load: true,
    data: null,
    error: null,
  };

  const [ekartState, dispatch] = useReducer(reducerHandler, initialState);
  const [asc, setasc] = useState(true);
  const [radio, setRadio] = useState("all");
  const [categories, setCategories] = useState([]);
  const [radioPrice, setradioPrice] = useState(1000);


  // const[cartItem,setcartItem]=useState([])

  const dis = useDispatch()

  const addToCart = useSelector((state) => state.addCart.cart)
  const addCartPrices = addToCart.reduce((acc, curr) => acc + curr.price, 0)


  const getlikes = useSelector((state) => state.addCart.likes)
  console.log('getlikes', getlikes);

  // const addCartHandler=()=>{
  //   dis(addProduct())
  // }



  const fetchCategories = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const data = await res.json();
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getData = async () => {
    if (!radio) return;
    try {
      dispatch({ type: "load" });

      const API =
        radio === "all"
          ? `https://fakestoreapi.com/products?sort=${asc ? "asc" : "desc"}`
          : `https://fakestoreapi.com/products/category/${radio}?sort=${asc ? "asc" : "desc"
          }`;
      const data = await fetch(API);
      const changeData = await data.json();

      dispatch({ type: "data", payload: changeData });
    } catch (error) {
      dispatch({ type: "error", payload: "error fetching" });
    }
  };
  const handleRadioValue = (e) => {
    setRadio(e.target.value);
    console.log(e.target.value);
  };
  const ascFunction = () => {
    // getData()
    setasc((prev) => !prev);
  };

  const priceHandler = (e) => {
    let p = Number(e.target.value);
    setradioPrice(p);
    console.log(typeof p);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    getData();
  }, [asc, radio, radioPrice]);

  // const uniqueCat=ekartState.data? Array.from(new Set(ekartState.data.map(item=>item.category))):[];
  // console.log('uniqueCat',uniqueCat);

  const getPriceproducts = ekartState.data
    ? ekartState.data.filter((item) => item.price < radioPrice)
    : [];




  const handleAddcart = (item) => {
    dis(addProduct(item))
    toast.success(`${item.title} is added to cart!😀`);
  }

  // const dislikesingleproduct=(item)=>{
  //   dis(dislikeproduct(item.id))
  //   toast.warning(`you disliked ${item.title}`)
  // }
  return (
    <div>
      {ekartState.error && <p>getting error check network</p>}

      <div className="mainBody">
        <div className="firstChild">
          <div className="filterSection">
            <h5>Filter</h5>
            {/* ////sorting the items */}

            <button className="sortButton">
              {asc ? (
                <svg
                  onClick={ascFunction}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-sort-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                </svg>
              ) : (
                <svg
                  onClick={ascFunction}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-sort-up"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                </svg>
              )}
            </button>
          </div>
          <div className="allcatfilter">
            <input
              type="radio"
              name="category"
              checked={radio === "all"}
              value="all"
              onChange={handleRadioValue}
            />
            All
          </div>
          {categories.map((i, index) => {
            // <input type="radio" />All
            return (
              <div key={index} className="catFilters">
                <div className="catfilterchilds">
                  <input
                    type="radio"
                    value={i}
                    checked={radio === i}
                    name="category"
                    onChange={handleRadioValue}
                  />
                  <small>{i}</small>
                </div>
              </div>
            );
          })}
          <div>

            {/* <br /> */}
            <div>
              <h5>Prices</h5>
              <div className="forPricefilters">
                <div className="childpriceInfo">
                  <input
                    type="radio"
                    onChange={priceHandler}
                    value={50}
                    checked={radioPrice === 50}
                    name="priceValue"
                  />
                  <span>{">"}50</span>
                </div>
                <div className="childpriceInfo">
                  <input
                    type="radio"
                    onChange={priceHandler}
                    value={100}
                    name="priceValue"
                    checked={radioPrice === 100}
                  />
                  <span>{">"}100</span>
                </div>
                <div className="childpriceInfo">
                  <input
                    type="radio"
                    onChange={priceHandler}
                    value={1000}
                    name="priceValue"
                    checked={radioPrice === 1000}
                  />
                  <span>{">"}1000</span>
                </div>

              </div>
            </div>
          <hr />
            {/* <h5>CartInfo</h5> */}
            <div className="leftCartInfo">
              <div className="leftcartchild">
                <h6>Products</h6>
                <h6><strong>{addToCart.length}</strong></h6>
              </div>
              <div className="leftcartchild">
                <h6>Total</h6>
                <h6><strong>{parseInt(addCartPrices)}</strong></h6>
              </div>

            </div>
          </div>
        </div>

        <div>


          <h5>Products</h5>


          <div className="cardBlock">
            {ekartState.load && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {!ekartState.load && ekartState.data && (
              <>
                {getPriceproducts.map((item, index) => {
                  const inCart = addToCart.some((product) => product.id === item.id)

                  const checkLikeorNot = getlikes.some((product) => product.id === item.id)
                  console.log('c', checkLikeorNot);
                  return (
                    <div key={index} className="imageCard">
                      <Link to={`/products/${item.id}`} className="no-underline">
                        <img src={item.image} alt="pic" className="cartImage" />
                        <div className="forLikeButton">
                          {checkLikeorNot ? (
                            <button className="mainLikeButton" onClick={(e) => {
                              dis(dislikeproduct(item.id))
                              e.preventDefault()
                              e.stopPropagation()
                              toast.info(`you disliked ${item.title}`)
                            }}>

                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                              </svg>
                            </button>

                          ) : (

                            <button className="mainLikeButton" onClick={(e) => {
                              dis(likeproduct(item))
                              e.preventDefault()
                              e.stopPropagation()
                              toast.success(`you liked ${item.title}`)
                            }}>

                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                              </svg>
                            </button>



                          )}

                        </div>
                      </Link>
                      <div className="imageTitle">
                        <small>
                          <b>{item.title.substr(0,50)}</b>
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
                        <br />
                        <div className="priceCartInfo">
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
                            &nbsp;{item.price}
                          </small>

                        </div>
                        {inCart ? (<button className="addRemoveBut" onClick={() => dis(removeProduct(item.id))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-dash" viewBox="0 0 16 16">
                          <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg> &nbsp;Product</button>)
                          : (<button className="addRemoveBut" onClick={() => handleAddcart(item)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg> &nbsp;Cart</button>)}
                      </div>

                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ekart;
