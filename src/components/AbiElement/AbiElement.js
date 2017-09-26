import React from 'react'
import PropTypes from 'prop-types'
import './AbiElement.css'
import AbiElementInput from './AbiElementInput/AbiElementInput'
import classNames from 'classnames'
const _ = require('lodash')
const Web3 = require('web3')

const convertOutput = (output, format) => {
  const web3 = new Web3()
  switch (true) {
    case /string/.test(format.type):
      return web3.toAscii(output)
    case /int/.test(format.type):
      return web3.toDecimal(output)
    default:
      return output
  }
}

const AbiElement = ({item, onClick, handleInputChange, output, handleHideOutput}) => {
  const prefix = item.constant ? 'return value' : 'transaction hash'

  return (
    <div className={classNames('abiElement', item.type,
      item.constant ? 'constant' : '')}
         id={item.name ? item.name : 'constructor'}>
      <div className="headerRow">
        <div className='itemName'>{item.name}</div>
        <div className='itemType'>{item.constant
          ? '(const) '
          : null}{item.type}</div>
      </div>
      <div className="inputsOuterBox">

        {item.payable ? <AbiElementInput input={{name: 'value', type: 'int256'}}
                                         functionName={item.name}
                                         key={'payableAbiElementInput'}
                                         handleInputChange={handleInputChange}/>
          : null}


        {item.inputs.map((input) => (
          <AbiElementInput input={input} functionName={item.name}
                           key={input.name + 'AbiElementInput'}
                           handleInputChange={handleInputChange}/>
        ))}
      </div>

      <div>
        <button className="tryItOut" id={item.name}
                onClick={() => onClick(item.name)}>Try it out!
        </button>
      </div>

      { typeof(output) !== 'undefined' ? <div className="outputTextArea">
        <button className="hideOutputButton" id={item.name}
                onClick={() => handleHideOutput(item.name)}>Hide output
        </button>
        <textarea className='output' contentEditable={false}
                  value={output ? (item.constant ? convertOutput(output, item.outputs[0]): output) : ''}
                  placeholder={prefix}/>
      </div>
        : null}
    </div>
  )
}

AbiElement.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  output: PropTypes.string,
  handleHideOutput: PropTypes.func,
}

export default AbiElement
