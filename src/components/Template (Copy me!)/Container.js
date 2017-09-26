import Component from './Component'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)

export default Container