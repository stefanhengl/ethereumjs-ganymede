import update from 'immutability-helper';
import {
  CALL_RETURNED,
  CONNECT_BUTTON_CLICKED,
  FILE_UPLOADED,
  HIDE_OUTPUT_BUTTON_CLICKED,
  INPUT_CHANGED,
  POPUP_CANCEL_BUTTON_CLICKED,
  POPUP_OK_BUTTON_CLICKED,
  TRANSACTION_SENT,
  POPUP_ADVANCED_SETTINGS_BUTTON_CLICKED,
  PROMISE_REJECTED,
  NOTIFICATION_CLICKED,
} from './actions'
const _ = require('lodash')

const initialState = {
  abi: [],
  contract: '',
  show_connect_popup: false,
  provider: '',
  address: '',
  account: '',
  privateKey: '',
  show_popup_advanced_settings: false,
  notifications: [],
}

const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOADED:
      return Object.assign({}, state,
        {abi: action.abi, contract: action.contract})
    case CONNECT_BUTTON_CLICKED:
      return Object.assign({}, state, {show_connect_popup: true})
    case POPUP_CANCEL_BUTTON_CLICKED:
      return Object.assign({}, state, {show_connect_popup: false})
    case POPUP_OK_BUTTON_CLICKED:
      return Object.assign({}, state, {show_connect_popup: false})
    case INPUT_CHANGED:
      return Object.assign({}, state, {[action.id]: action.value})
    case CALL_RETURNED:
      return Object.assign({}, state,
        {[action.functionName + '__output']: action.result})
    case TRANSACTION_SENT:
      return Object.assign({}, state,
        {[action.functionName + '__output']: action.result})
    case HIDE_OUTPUT_BUTTON_CLICKED:
      return Object.assign({}, _.omit(state, action.id + '__output'))
    case POPUP_ADVANCED_SETTINGS_BUTTON_CLICKED:
      return Object.assign({}, state, {show_popup_advanced_settings: !state.show_popup_advanced_settings})
    case PROMISE_REJECTED:
      return Object.assign({}, state, {notifications: update(state.notifications, {$push: [{
          functionName: action.functionName,
          message: action.message,
          id: ID(),
        }]})})
    case NOTIFICATION_CLICKED:
      return Object.assign({}, state,
        {notifications: _.filter(state.notifications, (note) => note.id !== action.id )})
    default:
      return state
  }
}

export default reducer
