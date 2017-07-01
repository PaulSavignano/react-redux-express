import React, { Component }  from 'react'
import TextField from 'material-ui/TextField'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'


class renderSuccessableTextField extends Component {
  state = {
    submitting: false,
    submitSucceeded: false
  }
  componentWillReceiveProps(nextProps) {
    const { meta: { touched, error, submitting, submitFailed }} = nextProps
    if (submitting) this.setState({ submitting: true })
    if (!submitFailed && this.state.submitting) this.setState({ submitSucceeded: true })
    setTimeout(() => this.setState({ submitSucceeded: false, submitting: false }), 3500)
  }
  renderMessage = (touched, error, submitSucceeded) => {
    if (submitSucceeded) return <strong style={{ color: "#4CAF50" }}>Updated!</strong>
    if (touched && error) return <strong>{error}</strong>
  }
  renderStyle = (submitSucceeded) => {
    if (submitSucceeded) return { color: "#4CAF50" }
  }
  render() {
    const { input, label, meta: { touched, error }, ...custom } = this.props
    const { submitSucceeded } = this.state
    return (
      <TextField
        errorStyle={this.renderStyle(submitSucceeded)}
        errorText={this.renderMessage(touched, error, submitSucceeded)}
        {...input}
        {...custom}
      />
    )
  }
}

export default renderSuccessableTextField
