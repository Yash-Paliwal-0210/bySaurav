// src/Redux/Store.jsx

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/UserReducer'; // Assuming userReducer is exported from UserReducer
import productReducer from './Products/ProductReducer'; // Assuming productReducer is exported from ProductReducer
import orderReducer from './Orders/OrderReducer'; // Assuming orderReducer is exported from OrderReducer

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;
