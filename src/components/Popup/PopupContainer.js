import Popup from './Popup'
import { connect } from 'react-redux'
import {
  popupAdvancedSettingsButtonClicked,
  popupCancelButtonClicked,
  popupOkButtonClicked,
  inputChanged,
} from '../../actions'

const mapStateToProps = (state) => {
  return {
    provider: state.provider,
    address: state.address,
    account: state.account,
    privateKey: state.privateKey,
    showAdvancedSettings: state.show_popup_advanced_settings,
    gasLimit: state.gasLimit,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handle_popup_cancel: () => {dispatch(popupCancelButtonClicked())},
    handle_popup_ok: () => {
      dispatch(popupOkButtonClicked())
    },
    handlePopupAdvancedSettingsClicked: () => {
      dispatch(popupAdvancedSettingsButtonClicked())
    },
    handleInputChange: (id) => {
      dispatch(inputChanged(id, document.getElementById(id).value,
      ))
    },
  }
}

  const PopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Popup)

  export default PopupContainer