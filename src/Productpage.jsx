import React, { useContext, useEffect, useReducer } from "react";
import { useParams, Link } from "react-router-dom";

import { ApireducerContext } from "./context/Apireducer";
const Productpage = () => {
  const { cartId } = useParams();
  const { apiData, getIndividualPersonData } = useContext(ApireducerContext);
  // console.dir("apiData", typeof apiData);

  const original_id = Number(cartId);
  // console.log(typeof original_id);
  // console.dir(original_id);

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
  // console.log("getsingleProduct", getsingleProduct);

  useEffect(() => {
    getProduct();
  }, [original_id]);

  const getwithoutcurrentid = apiData.data
    ? apiData.data.filter((item) => item.id != original_id)
    : [];
  // console.log(getIndividualPersonData);

  return (
    <div>
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
    </div>
  );
};

export default Productpage;
