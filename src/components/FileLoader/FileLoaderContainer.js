import FileLoader from './FileLoader'
import { connect } from 'react-redux'
import { fileUploaded } from '../../actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    'fileSelected': () => {
      const fileToLoad = document.getElementById('fileUpload').files[0]

      if (typeof(fileToLoad) === 'undefined') {
        return
      }

      const fileReader = new FileReader()
      fileReader.onload = function (fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result
        const jsonFromFileLoaded = JSON.parse(textFromFileLoaded)
        dispatch(fileUploaded(jsonFromFileLoaded.abi, jsonFromFileLoaded.contract_name))
      }

      fileReader.readAsText(fileToLoad, 'UTF-8')
    },
  }
}

const FileLoaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileLoader)

export default FileLoaderContainer