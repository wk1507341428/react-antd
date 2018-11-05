import store from './store.js';
import { addToCart,updateCart,deleteFromCart }  from './actions/cart-actions';

console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// store.dispatch(addToCart('Coffee 500gm', 1, 250));
// store.dispatch(addToCart('Flour 1kg', 2, 110));
// store.dispatch(addToCart('Juice 2L', 1, 250));

// // Update Cart
// store.dispatch(updateCart('Flour 1kg', 5, 110));

// // Delete from Cart
// store.dispatch(deleteFromCart('Coffee 500gm'));

// unsubscribe();

// 我就想知道这玩意怎么在react中的组件里实用，哪有这么麻烦