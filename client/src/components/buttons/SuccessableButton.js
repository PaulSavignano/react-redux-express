import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

class SuccessableButton extends Component {
  state = {
    submitting: false,
    submitSucceeded: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, submitting } = nextProps
    if (submitting) this.setState({ submitting: true })
    if (submitSucceeded && this.state.submitting) {
      this.setState({ submitting: false, submitSucceeded: true })
      setTimeout(() => this.setState({ submitSucceeded: false }), 3000)
    }
  }
  renderLabel = (submitting, submitSucceeded, label) => {
    if (submitting) return <div key={1} style={{ marginTop: 2 }}><CircularProgress color="#ffffff" size={30} /></div>
    if (submitSucceeded) return <div key={2} style={{ color: '#ffffff' }}>UPDATED {label}</div>
    return <div key={3} style={{ color: '#ffffff' }}>UPDATE {label}</div>
  }
  render() {
    const { submitting, label, style } = this.props
    const backgroundColor = style ? style.backgroundColor : null
    const fontFamily = style ? style.fontFamily : 'inherit'
    const { submitSucceeded } = this.state
    return (
      <RaisedButton
        type="submit"
        children={this.renderLabel(submitting, submitSucceeded, label)}
        primary={submitSucceeded ? false : true}
        backgroundColor={submitSucceeded ? "#4CAF50" : backgroundColor }
        style={{ flex: '1 1 auto', margin: 4 }}
        buttonStyle={{ fontFamily }}
      />
    )
  }
}

export default SuccessableButton
