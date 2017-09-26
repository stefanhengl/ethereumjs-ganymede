/**
 * Created by d055847 on 23.09.17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import './FileLoader.css'

const FileLoader = ({fileSelected}) => {
  return(
    <div className="fileLoader">
      <input type="file" id="fileUpload" onChange={() => fileSelected()}/>
    </div>
  )
}

FileLoader.propTypes = {
      fileSelected: PropTypes.func.isRequired
  }

export default FileLoader
