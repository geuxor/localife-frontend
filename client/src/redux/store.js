import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducers/reducers'

const store = createStore(reducer)

export default store
