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
    if (submitting) return <div key={1} style={{ marginTop: 2 }}><CircularProgress color="#ffffff" size={24} style={{ verticalAlign: 'middle' }} /></div>
    if (submitSucceeded) return <div key={2} style={{ color: '#ffffff', textTransform: 'uppercase' }}>{successLabel}</div>
    return <div key={3} style={{ color: '#ffffff', textTransform: 'uppercase' }}>{label}</div>
  }
  render() {
    const { submitting, label, style, successLabel, dispatch, form } = this.props
    const backgroundColor = style ? style.backgroundColor : 'inherit'
    const fontFamily = style ? style.fontFamily : 'inherit'
    const { submitSucceeded } = this.state
    return (
      <RaisedButton
        onTouchTap={() => dispatch(submit(form))}
        children={this.renderLabel(submitting, submitSucceeded, label, successLabel)}
        primary={submitSucceeded ? false : true}
        backgroundColor={submitSucceeded ? "#4CAF50" : backgroundColor }
        style={{ flex: '1 1 auto', margin: 4 }}
        buttonStyle={{ fontFamily }}
      />
    )
  }
}

export default connect()(SuccessableButton)
