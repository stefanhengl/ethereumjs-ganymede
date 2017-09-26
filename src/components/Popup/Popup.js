import React from 'react'
import './Popup.css'
import PropTypes from 'prop-types'

const Component = (
  {
    handle_popup_ok,
    handle_popup_cancel,
    provider,
    address,
    account,
    privateKey,
    handlePopupAdvancedSettingsClicked,
    showAdvancedSettings,
    handleInputChange,
    gasLimit,
  }) => {
  return (
    <div className="Popup">
      <div className="popupHeading">
        Connect
      </div>
      <div>
        <div className="popupLabelInputPair">
          <label className="popupLabel">Provider</label>
          <input className="popupInput"
                 id="provider"
                 defaultValue={provider}
                 onChange={() => handleInputChange('provider')}
          />
        </div>
        <div className="popupLabelInputPair">
          <label className="popupLabel">Contract address</label>
          <input className="popupInput"
                 id="address"
                 defaultValue={address}
                 onChange={() => handleInputChange('address')}
          />
        </div>
      </div>
      <div className="popupHeading">
        Credentials
      </div>
      <div className="popupLabelInputPair">
        <label className="popupLabel">Account</label>
        <input className="popupInput"
               id="account"
               defaultValue={account}
               onChange={() => handleInputChange('account')}
        />
      </div>
      <div className="popupLabelInputPair">
        <label className="popupLabel">Private Key</label>
        <input className="popupInput"
               id="privateKey"
               defaultValue={privateKey}
               type="password"
               onChange={() => handleInputChange('privateKey')}
        />
      </div>
      <div>
        <button className="popupAdvancedSettingsButton"
                onClick={() => handlePopupAdvancedSettingsClicked()}>
          {showAdvancedSettings?
            "hide advanced settings":
            "advanced settings"}
        </button>
      </div>
      {showAdvancedSettings ? <div className="popupLabelInputPair">
        <label className="popupLabel">gas limit (global)</label>
        <input className="popupInput" id="gasLimit"
               defaultValue={gasLimit}
               onChange={() => handleInputChange('gasLimit')}/>
      </div>
        : null}
      <div className="popup-buttonRow">
        <div>
          <button onClick={() => handle_popup_cancel()}>Cancel</button>
        </div>
        <div>
          <button onClick={() => handle_popup_ok()}>Ok</button>
        </div>
      </div>
    </div>
  )
}

Component.propTypes = {
  handle_popup_cancel: PropTypes.func.isRequired,
  handle_popup_ok: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  handlePopupAdvancedSettingsClicked: PropTypes.func.isRequired,
  showAdvancedSettings: PropTypes.bool,
  handleInputChange: PropTypes.func.isRequired,
  gasLimit: PropTypes.string,
}

export default Component
