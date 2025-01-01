import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Panier.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../../store/reducer";

function Panier() {
  const cartlist = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const updateQuantity = (id, amount) => {
    dispatch(updateCartQuantity(id, amount));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };
  const calculateSubtotal = () => {
    return cartlist.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = cartlist.length > 0 && subtotal > 50 ? 0 : 0; // Example shipping fee logic
  const total = (subtotal + shipping).toFixed(2);

  const procedePayement = async () => {
    // ra total tma 
    // zid dik l3yba dyal role f back end f login wra ghaykhdem 3ndk f pc dyalek w hana an3awed nsifet lik front 
    // hna dir payement 
    console.log("Proceeding to payment...");
  }


  return (
    <div className="cart-wrapper">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Shopping Cart</h4>
              <span className="text-muted">{cartlist.length} items</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {cartlist.length > 0 ? cartlist.map((item) => (
                <div key={item.id} className="product-card p-3 shadow-sm">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img src={item.image} alt={item.name} className="product-image" />
                    </div>
                    <div className="col-md-4">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted mb-0 crop-text-2">{item.description}</p>
                      <span className="discount-badge mt-2">{item.category.name}</span>
                    </div>
                    <div className="col-md-3">
                      <div class="d-flex align-items-center gap-2">
                        <button class="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <input type="number" class="quantity-input" value={item.quantity} readOnly />
                        <button class="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>


                    </div>
                    <div className="col-md-2">
                      <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="col-md-1 flex-column d-flex justify-content-start align-items-start">
                      <svg className="remove-btn mx-1" onClick={() => removeItem(item.id)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </div>

                  </div>
                </div>
              )) : (<p> Votre Panier est vide</p>)}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="summary-card p-4 shadow-sm">
              <h5 className="mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold">${total}</span>
              </div>

              {/* <div className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    Apply
                  </button>
                </div>
              </div> */}

              <button onClick={procedePayement} className="btn btn-primary checkout-btn w-100 mb-3">
                Proceed to Checkout
              </button>

              <div className="d-flex justify-content-center gap-2">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-muted">Secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
export default Panier;
