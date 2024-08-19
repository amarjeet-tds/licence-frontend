import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { persistStore, persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
    key: 'root',
    storage,
};
  
const persistedReducer = persistReducer(persistConfig, storeSlice.reducer);

const store = configureStore({
    reducer: {
        locker : persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store);
  
export { store, persistor }

export const { resetState } = storeSlice.actions