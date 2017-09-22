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
    imageEdit,
    label,
    reset,
    submitSucceeded,
    submitting,
    successLabel,
    valid
  }) {
    if (imageEdit) {
      return this.setState({
        background: backgroundColor,
        disabled: false,
        label,
      })
    }

    if (error) {
      const timeoutId = setTimeout(() => {
        clearTimeout(this.state.timeoutId)
        this.setState({
          background: backgroundColor,
          label,
          disabled: true,
          label,
          submitting: false
        })
        reset && reset()
      }, 3000)
      return this.setState({
        background: 'rgb(244, 67, 54)',
        disabled: false,
        label: error,
        timeoutId
      })
    }

    if (dirty && valid) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId)
      }
      return this.setState({
        background: backgroundColor,
        disabled: false,
        label,
        timeoutId: null
      })
    }

    if (dirty && !valid) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId)
      }
      return this.setState({
        background: backgroundColor,
        disabled: true,
        label,
        timeoutId: null
      })
    }

    if (submitSucceeded) {
      const timeoutId = setTimeout(() => {
        clearTimeout(this.state.timeoutId)
        this.setState({
          background: backgroundColor,
          disabled: true,
          label,
          submitting: false
        })
        reset && reset()
      }, 3000)
      return this.setState({
        background: 'rgb(76, 175, 80)',
        disabled: false,
        label: successLabel,
        timeoutId
      })
    }

    if (!dirty && valid) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId)
      }
      return this.setState({
        background: backgroundColor,
        disabled: true,
        label,
        timeoutId: null
      })
    }

  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
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
  reset: PropTypes.func,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successLabel: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired
}

export default successableButtonContainer(SuccessableButton)
