import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import buttonContainer from '../../containers/buttons/buttonContainer'

class SuccessableButton extends Component {
  state = {
    background: null,
    disabled: null,
    label: '',
  }
  componentWillMount() {
    const {
      disabled,
      backgroundColor,
      label
    } = this.props
    this.setState({ background: backgroundColor, disabled, label })
  }
  componentWillReceiveProps({
    backgroundColor,
    disabled,
    error,
    imageEdit,
    label,
    reset,
    submitSucceeded,
    submitting,
    successLabel,
  }) {
    console.log('disabled', disabled)
    if (imageEdit !== this.props.imageEdit) {
      clearTimeout(this.state.timeoutId)
      return this.setState({
        background: backgroundColor,
        disabled: false,
        label,
      })
    }


    if (error) {
      clearTimeout(this.state.timeoutId)
      const timeoutId = setTimeout(() => {
        this.setState({
          background: backgroundColor,
          disabled: true,
          label,
          submitting: false,
          timeoutId: null
        })
        clearTimeout(this.state.timeoutId)
        reset && reset()

      }, 3000)
      return this.setState({
        background: 'rgb(244, 67, 54)',
        disabled: false,
        label: error,
        timeoutId
      })
    }

    if (disabled !== this.props.disabled) {
      clearTimeout(this.state.timeoutId)
      this.setState({
        background: backgroundColor,
        disabled,
        label,
        timeoutId: null
      })
    }

    if (submitSucceeded !== this.props.submitSucceeded) {
      clearTimeout(this.state.timeoutId)
      const timeoutId = setTimeout(() => {
        this.setState({
          background: backgroundColor,
          disabled: true,
          label,
          submitting: false
        })
        clearTimeout(this.state.timeoutId)
        reset && reset()
      }, 3000)
      return this.setState({
        background: 'rgb(76, 175, 80)',
        disabled: false,
        label: successLabel,
        timeoutId
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
  disabled: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  reset: PropTypes.func,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successLabel: PropTypes.string.isRequired,
}

export default buttonContainer(SuccessableButton)
