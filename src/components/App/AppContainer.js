import App from './App'
import { connect } from 'react-redux'
import {
  connectButtonClicked,
  inputChanged,
  tryItOutButtonClicked,
  hideOutputButtonClicked,
} from '../../actions'

const _ = require('lodash')

const mapStateToProps = (state) => {
  return {
    abi: state.abi,
    contract: state.contract,
    show_connect_popup: state.show_connect_popup,
    outputs: _.pickBy(state, (v, k) => _.endsWith(k,'__output')),
    notifications: state.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleConnect: () => dispatch(connectButtonClicked()),
    handleTryItOut: (id) => {
      dispatch(tryItOutButtonClicked(id))
    },
    handleInputChange: (id) => {
      dispatch(inputChanged(id, document.getElementById(id).value,
      ))
    },
    handleHideOutput: (id) => {
      dispatch(hideOutputButtonClicked(id))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default AppContainer