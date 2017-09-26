import React from 'react'
import PropTypes from 'prop-types'
import AbiElement from '../AbiElement/AbiElement'
import './App.css'
import PopupContainer from '../Popup/PopupContainer'
import FileLoaderContainer from '../FileLoader/FileLoaderContainer'
import NotificationsContainer from '../Notifications/NotificationsContainer'
const _ = require('lodash')

const App = (
  {
    abi, contract, handleConnect, show_connect_popup, handleTryItOut, handleInputChange, outputs,
    handleHideOutput, notifications,
  }) => {
  return (
    <div>
      {notifications.length>0 ? <NotificationsContainer/>
      : null}

      <FileLoaderContainer/>

      { contract ?
        <button className="connectButton" onClick={() => handleConnect() }>
          Settings</button> : null}

      <div className="contractName">
        {contract}
      </div>
      <div className="abiElements">
        {_.filter(abi, (item) => _.includes(['function', 'event'], item.type))
        .map((ele) => <AbiElement
            item={ele}
            key={ele.name ? ele.name : 'constructor'}
            onClick={handleTryItOut}
            handleInputChange={handleInputChange}
            output={outputs[ele.name + '__output']}
            handleHideOutput={handleHideOutput}
          />)}
      </div>
      <div>
        {show_connect_popup ? <div><PopupContainer/>
          <div className="overlay"></div>
        </div> : null}
      </div>
    </div>

  )
}

App.propTypes = {
  abi: PropTypes.array.isRequired,
  contract: PropTypes.string.isRequired,
  handleConnect: PropTypes.func.isRequired,
  show_connect_popup: PropTypes.bool.isRequired,
  handleTryItOut: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleHideOutput: PropTypes.func,
}

export default App
