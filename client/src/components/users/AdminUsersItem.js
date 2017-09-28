import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import history from '../../containers/routers/history'
import P from '../typography/P'
import { fetchDelete, fetchUpdate } from '../../actions/users'

const styles = {
  card: {
    margin: 16
  },
  cardContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  p: {
    flex: '3 3 auto',
    padding: '16px 8px'
  }
}

class AdminUsersItem extends Component {
  state = {
    elevation: 1
  }
  handleEdit = () => {
    const { user: { _id }} = this.props
    return history.push(`/admin/users/edit/${_id}`)
  }
  handleDelete = () => {
    const { dispatch, user: { _id }} = this.props
    if (window.confirm('Are you sure you want to delete this user?')) {
      return dispatch(fetchDelete(_id))
    }
  }
  handleFormSubmit = (values) => {
    const { dispatch, user: { _id }} = this.props
    return dispatch(fetchUpdate(_id, values))
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  render() {
    const {
      user: {
        values: {
          email
        }
      },
    } = this.props
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        containerStyle={styles.cardContainer}
        style={styles.card}
      >
        <div style={styles.p}>
          <P>{email}</P>
        </div>

        <div className="AdminUsersItemButtons">
          <RaisedButton
            onTouchTap={this.handleEdit}
            type="button"
            label="Edit"
            style={{ margin: 4 }}
            primary={true}
          />
          <RaisedButton
            onTouchTap={this.handleDelete}
            type="button"
            label="X"
            className="delete-button"
            style={{ margin: 4 }}
            primary={true}
          />
        </div>
      </Card>
    )
  }
}

AdminUsersItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default AdminUsersItem
