import Notifications from './Notifications'
import { connect } from 'react-redux'
import { notificationClicked } from '../../actions'


const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNoteClick: (id) => dispatch(notificationClicked(id))
  }
}

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications)

export default NotificationsContainer