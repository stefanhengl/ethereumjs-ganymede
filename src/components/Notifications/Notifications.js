import React from 'react'
import './Notifications.css'
import PropTypes from 'prop-types'

const Notifications = ({notifications, handleNoteClick}) => {
  console.log(notifications)
  return (
    <div className="notificationsOuterBox">
      {notifications.map(note =>
        <div className="note" onClick={() => handleNoteClick(note.id)} key={note.id}>
          <div className="noteTitle">{note.message.name} ({note.functionName})
          </div>
          {note.message.message}
        </div>
      )}
    </div>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  handleNoteClick: PropTypes.func.isRequired,
}

export default Notifications
