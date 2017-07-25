import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

class SuccessableButton extends Component {
  state = {
    submitting: false,
    submitSucceeded: false,
    timeoutId: null
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, submitting } = nextProps
    if (submitting) this.setState({ submitting: true })
    if (submitSucceeded && this.state.submitting) {
      const timeoutId = setTimeout(() => this.setState({ submitSucceeded: false }), 3000)
      this.setState({ submitting: false, submitSucceeded: true, timeoutId })
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  renderLabel = (submitting, submitSucceeded, label, successLabel) => {
    if (submitting) return <CircularProgress color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} />
    if (submitSucceeded) return successLabel
    return label
  }
  render() {
    const { submitting, label, style, successLabel, dispatch } = this.props
    const styles = style || {}
    const backgroundColor = styles.backgroundColor || 'inherit'
    const fontFamily = styles.fontFamily || 'inherit'
    const margin = styles.margin || null
    const color = styles.color || 'inherit'
    const { submitSucceeded } = this.state
    const isPrimary = style ? { primary: false } : { primary: true }
    return (
      <RaisedButton
        type="submit"
        label={this.renderLabel(submitting, submitSucceeded, label, successLabel)}
        labelColor={color}
        backgroundColor={submitSucceeded ? "#4CAF50" : backgroundColor }
        style={{ flex: '1 1 auto', margin }}
        buttonStyle={{ fontFamily }}
        {...isPrimary}
      />
    )
  }
}

export default connect()(SuccessableButton)
