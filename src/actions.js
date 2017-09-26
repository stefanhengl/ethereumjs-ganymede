const _ = require('lodash')
const ethereumRemote = require('ethereumjs-remote')

export const FILE_UPLOADED = 'FILE_UPLOADED'
export const CONNECT_BUTTON_CLICKED = 'CONNECT_BUTTON_CLICKED'
export const POPUP_CANCEL_BUTTON_CLICKED = 'POPUP_CANCEL_BUTTON_CLICKED'
export const POPUP_OK_BUTTON_CLICKED = 'POPUP_OK_BUTTON_CLICKED'
export const CALL_RETURNED = 'CALL_RETURNED'
export const TRANSACTION_SENT = 'TRANSACTION_SENT'
export const INPUT_CHANGED = 'INPUT_CHANGED'
export const HIDE_OUTPUT_BUTTON_CLICKED = 'HIDE_OUTPUT_BUTTON_CLICKED'
export const POPUP_ADVANCED_SETTINGS_BUTTON_CLICKED = 'POPUP_ADVANCED_SETTINGS_BUTTON_CLICKED'
export const PROMISE_REJECTED = 'PROMISE_REJECTED'
export const NOTIFICATION_CLICKED = 'NOTIFICATION_CLICKED'

export function fileUploaded (abi, contract) {
  return {
    type: FILE_UPLOADED,
    abi,
    contract,
  }
}

export function notificationClicked (id) {
  return {
    type: NOTIFICATION_CLICKED,
    id
  }
}

export function hideOutputButtonClicked (id) {
  return {
    type: HIDE_OUTPUT_BUTTON_CLICKED,
    id,
  }
}

export function connectButtonClicked () {
  return {
    type: CONNECT_BUTTON_CLICKED,
  }
}

export function popupCancelButtonClicked () {
  return {
    type: POPUP_CANCEL_BUTTON_CLICKED,
  }
}

export function popupOkButtonClicked () {
  return {
    type: POPUP_OK_BUTTON_CLICKED,
  }
}

export function popupAdvancedSettingsButtonClicked () {
  return {
    type: POPUP_ADVANCED_SETTINGS_BUTTON_CLICKED,
  }
}

export function callReturned (functionName, result) {
  return {
    type: CALL_RETURNED,
    functionName,
    result,
  }
}

export function transactionSent (functionName, result) {
  return {
    type: TRANSACTION_SENT,
    functionName,
    result,
  }
}

export function promiseRejected (functionName, message) {
  return {
    type: PROMISE_REJECTED,
    functionName,
    message,
  }
}

export function tryItOutButtonClicked (id) {
  return (dispatch, getState) => {
    const state = getState()

    // filter for all state keys that contain the value of id
    const z = Object.keys(state).filter(function (k) {
      return k.indexOf(id) === 0
    }).reduce(function (newData, k) {
      newData[k] = state[k]
      return newData
    }, {})

    const mapOfFunctionArguments = _.mapKeys(z, function (v, k) {
      return k.split('__')[1]
    })

    const functionName = id.split('__')[0]
    const functionDefinition = _.find(state.abi, (o) => o.name === functionName)
    const inputs = functionDefinition.inputs
    const functionArguments = _.map(inputs, (input) => {
      return mapOfFunctionArguments[input.name]
    })

    if (functionDefinition.constant) {
      const params = {
        contractAddress: state.address,
        abi: state.abi,
        functionName,
        functionArguments,
        provider: state.provider,
      }
      ethereumRemote.call(params)
      .then(res => dispatch(callReturned(functionName, res)))
      .catch(err => dispatch(promiseRejected(functionName, err)))

    } else {
      const params = {
        from: state.account,
        privateKey: state.privateKey,
        value: mapOfFunctionArguments.hasOwnProperty('value')
          ? mapOfFunctionArguments.value
          : 0,
        contractAddress: state.address,
        abi: state.abi,
        functionName,
        functionArguments,
        provider: state.provider,
      }

      if (typeof(state.gasLimit) !== 'undefined') {
        params.gasLimit = state.gasLimit
      }

      ethereumRemote.sendTransaction(params)
      .then(txHash => dispatch(transactionSent(functionName, txHash)))
      .catch(err => dispatch(promiseRejected(functionName, err)))
    }

  }
}

export function inputChanged (id, value) {
  return {
    type: INPUT_CHANGED,
    id,
    value,
  }
}