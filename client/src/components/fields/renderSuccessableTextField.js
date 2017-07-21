import React, { Component }  from 'react'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'

class renderSuccessableTextField extends Component {
  state = {
    submitting: false,
    submitSucceeded: false
  }
  componentWillReceiveProps({ meta: { submitting, submitFailed } }) {
    if (submitting) this.setState({ submitting: true })
    if (this.state.submitting && !submitFailed) {
      this.setState({ submitting: false, submitSucceeded: true })
      setTimeout(() => this.setState({ submitSucceeded: false }), 3000)
    }
  }
  renderMessage = (touched, error, submitting, submitSucceeded) => {
    if (submitting) return <CircularProgress size={16} />
    if (submitSucceeded) return <strong style={{ color: "#4CAF50" }}>Updated!</strong>
    if (touched && error) return <strong>{error}</strong>
  }
  renderStyle = (submitting, submitSucceeded) => {
    if (submitting) return { color: 'none' }
    if (submitSucceeded) return { color: "#4CAF50" }
  }
  render() {
    const { input, label, meta: { touched, error }, ...custom } = this.props
    const { submitSucceeded, submitting } = this.state
    return (
      <TextField
        errorStyle={this.renderStyle(submitting, submitSucceeded)}
        errorText={this.renderMessage(touched, error, submitting, submitSucceeded)}
        {...input}
        {...custom}
      />
    )
  }
}

export default renderSuccessableTextField
