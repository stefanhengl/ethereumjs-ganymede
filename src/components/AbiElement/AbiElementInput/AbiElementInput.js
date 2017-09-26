import React from 'react'
import PropTypes from 'prop-types'
import './AbiElementInput.css'

const AbiElementInput = ({functionName, input, handleInputChange}) => {
  return(
    <div className="abiInputLine">
      <p className="inputLabel">{input.name}</p>
      <input className="inputField" id={functionName +'__'+input.name} placeholder={input.type} onChange={() => handleInputChange(functionName +'__'+input.name)}/>
    </div>
  )
}

AbiElementInput.propTypes = {
  input: PropTypes.object.isRequired,
  functionName: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired
  }

export default AbiElementInput
