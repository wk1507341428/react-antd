import { combineReducers } from 'redux'
import cardReducer from './card-reducer'
import msgReducer from './message-reducers'

const allReducers = {
  cardZindex: cardReducer,
  messageBox: msgReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;