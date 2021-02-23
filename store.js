import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'

import rootReducer from './src/reducers'

const initialState = {}

const middleware = [thunk]

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'ui'
    ],
    timeout: 0
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = composeWithDevTools({ trace: true, traceLimiy: 25 })

const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

export { store, persistor }