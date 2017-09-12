import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import successableButtonContainer from '../../containers/buttons/successableButtonContainer'

class SuccessableButton extends Component {
  state = {
    background: null,
    disabled: null,
    label: '',
    submitSucceeded: false,
  }
  componentWillMount() {
    const {
      backgroundColor,
      valid,
      label
    } = this.props
    this.setState({ background: backgroundColor, disabled: true, label })
  }
  componentWillReceiveProps({
    backgroundColor,
    dirty,
    error,
    label,
    submitFailed,
    submitSucceeded,
    successLabel,
    valid
  }) {
    if (submitFailed) {
      if (dirty && valid) {
        return this.setState({
          background: backgroundColor,
          disabled: false,
          label,
        })
      }
      if (dirty && !valid) {
        return this.setState({
          background: 'rgb(244, 67, 54)',
          disabled: true,
          label: error
        })
      }
      if (dirty && valid) {
        return this.setState({
          background: 'rgb(244, 67, 54)',
          disabled: true,
          label
        })
      }
      if (!dirty) {
        return this.setState({
          background: backgroundColor,
          disabled: true,
          label
        })
      }
    }
    if (submitSucceeded) {
      if (dirty && valid) {
        return this.setState({
          background: backgroundColor,
          disabled: false,
          label,
        })
      }
      if (dirty && !valid) {
        return this.setState({
          background: backgroundColor,
          disabled: true,
          label
        })
      }
      if (!dirty && valid) {
        return this.setState({
          background: 'rgb(76, 175, 80)',
          disabled: false,
          label: successLabel,
        })
      }
      if (!dirty) {
        return this.setState({
          background: backgroundColor,
          disabled: true,
          label
        })
      }
    }
    if (dirty && valid) {
      return this.setState({
        background: backgroundColor,
        disabled: false,
        label,
      })
    }
    if (dirty && !valid) {
      return this.setState({
        background: backgroundColor,
        disabled: true,
        label
      })
    }
    if (!dirty && valid) {
      return this.setState({
        background: backgroundColor,
        disabled: true,
        label,
      })
    }
    if (!dirty) {
      return this.setState({
        background: backgroundColor,
        disabled: true,
        label
      })
    }
  }
  render() {
    const {
      submitting,
      color,
      fontFamily,
      style,
    } = this.props
    return (
      <RaisedButton
        backgroundColor={this.state.background}
        className="button"
        disabled={this.state.disabled}
        label={submitting ? <CircularProgress color={color} size={25} style={{ verticalAlign: 'middle' }} /> : this.state.label}
        labelColor={color}
        labelStyle={{ fontFamily }}
        onTouchTap={this.handleTouchTap}
        style={style}
        type="submit"
      />
    )
  }
}

SuccessableButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successLabel: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired
}



export default successableButtonContainer(SuccessableButton)
