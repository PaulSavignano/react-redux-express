import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: 8
  },
  qty: {
    flex: '1 1 auto',
  },
  input: {
    textAlign: 'center'
  },
  button: {
    fontSize: '24px'
  }
}

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
      <div style={styles.grid}>
        <RaisedButton label="-" primary={true} onClick={this.minus} labelStyle={styles.button} />
        <TextField
          style={styles.qty}
          inputStyle={styles.input}
          ref={node => qty = node}
          value={this.state.qty}
          id={this.props.id}
        />
        <RaisedButton label="+" primary={true} onClick={this.plus} labelStyle={styles.button} />
      </div>
    )
  }
}

export default Quantity
