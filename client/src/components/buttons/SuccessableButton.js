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
    submitFailed: false,
    submitSucceeded: false,
    timeoutId: null
  }
  componentWillMount() {
    const {
      backgroundColor,
      valid,
      label
    } = this.props
    this.setState({ background: backgroundColor, disabled: !valid, label })
  }
  componentWillReceiveProps({
    backgroundColor,
    color,
    destroy,
    dispatch,
    error,
    fontFamily,
    label,
    submitFailed,
    submitSucceeded,
    submitting,
    successLabel,
    valid
  }) {
    if (error && submitFailed !== this.state.submitFailed) {
      const timeoutId = setTimeout(() => {
       this.setState({
          background: backgroundColor,
          label,
          disabled: true,
          label
        })
        clearTimeout(this.state.timeoutId)
      },3000)
      return this.setState({
        background: 'rgb(244, 67, 54)',
        disabled: false,
        label: error,
        submitFailed,
        timeoutId
      })
    }
    if (submitSucceeded !== this.state.submitSucceeded) {
      const timeoutId = setTimeout(() => {
        this.setState({
        background: backgroundColor,
        disabled: !valid,
        label
      })
      clearTimeout(this.state.timeoutId)
    }, 3000)
      return this.setState({
        background: 'rgb(76, 175, 80)',
        disabled: false,
        label: successLabel,
        timeoutId
      })
    }
    if (valid) {
      clearTimeout(this.state.timeoutId)
      return this.setState({
        background: backgroundColor,
        disabled: false,
        label,
        submitFailed: false,
        submitSucceeded: false,
        timeoutId: null
      })
    } else {
      return this.setState({ disabled: true })
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
    this.props.destroy()
  }
  render() {
    const {
      submitting,
      color,
      fontFamily,
      style,
    } = this.props
    const styles = style ? style : { margin: 8 }
    return (
      <RaisedButton
        type="submit"
        disabled={this.state.disabled}
        label={submitting ? <CircularProgress color={color} size={25} style={{ verticalAlign: 'middle' }} /> : this.state.label}
        labelColor={color}
        backgroundColor={this.state.background}
        style={{ flex: '1 1 auto', ...styles }}
        labelStyle={{ fontFamily }}
      />
    )
  }
}

SuccessableButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  destroy: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  fontFamily: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successLabel: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired
}



export default successableButtonContainer(SuccessableButton)
