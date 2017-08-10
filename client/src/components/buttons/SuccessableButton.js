import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

class SuccessableButton extends Component {
  state = {
    submitting: false,
    submitted: false,
    timeoutId: null
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, submitting } = nextProps
    if (submitting) this.setState({ submitting: true })
    if (submitSucceeded && this.state.submitting) {
      const timeoutId = setTimeout(() => this.setState({ submitted: false }), 3000)
      this.setState({ submitting: false, submitted: true, timeoutId })
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  renderLabel = (color, label, submitting, submitted, successLabel) => {
    if (submitting) return <CircularProgress color={color} size={25} style={{ verticalAlign: 'middle' }} />
    if (submitted) return successLabel
    return label
  }
  render() {
    const { submitted } = this.state
    const {
      backgroundColor,
      color,
      fontFamily,
      isFetching,
      label,
      submitting,
      successLabel,
      style,
    } = this.props
    const styles = style ? style : { margin: 8 }
    return (
      !isFetching &&
      <RaisedButton
        type="submit"
        label={this.renderLabel(color, label, submitting, submitted, successLabel)}
        labelColor={color}
        backgroundColor={submitted ? "#4CAF50" : backgroundColor }
        style={{ flex: '1 1 auto', ...styles }}
        labelStyle={{ fontFamily }}
      />
    )
  }
}

export default connect(
  ({
    brand: {
      isFetching,
      theme: {
        palette: { canvasColor, fontFamily, primary1Color, }
      }
    }
  }) => ({
    backgroundColor: primary1Color,
    color: canvasColor,
    fontFamily,
    isFetching
  })
)(SuccessableButton)
