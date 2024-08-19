import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const initialState = {
    user_name: "",
    quota_left : null,
    jwt_token: null,
    active_plan_id: null
  }
const storeSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state, action) => {
            let tp = {
                ...action.payload
            }
            Object.assign(state,tp)
        }
        
    },
})
const persistConfig = {
    key: 'root', // key is required
    storage, // storage is required
    // Add any reducer-specific settings or whitelist/blacklist reducers here if needed
};
  
const persistedReducer = persistReducer(persistConfig, storeSlice.reducer);

const store = configureStore({
    reducer: {
        locker : persistedReducer
    },
})
// Create the store with the persisted reducer

// Create a persistor, which is used to persist the store
const persistor = persistStore(store);
  
export { store, persistor }





export const { resetState } = storeSlice.actions