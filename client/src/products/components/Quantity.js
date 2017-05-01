import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Quantity extends Component {
  state = {
    qty: 1
  }
  minus = () => {
    this.state.qty > 1 ? this.setState({ qty: this.state.qty - 1 }) : null
  }
  plus = () => {
    this.setState({ qty: this.state.qty + 1 })
  }
  render() {
    let qty
    return (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
        <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: 24 }} />
        <TextField
          style={{ flex: '1 1 auto' }}
          inputStyle={styles.input}
          ref={node => qty = node}
          value={this.state.qty}
          id={this.props.id}
        />
        <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: 24 }} />
      </div>
    )
  }
}

export default Quantity
