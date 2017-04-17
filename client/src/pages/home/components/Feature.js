import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  cell: {
    flex: '1 1 auto',
    width: 300,
    minWidth: 300,
    margin: '.8em 1em 0'
  },
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

class Feature extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    })
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    })
  }
  render() {
    const { dispatch, _id, name, description, image } = this.props
    return (
      <Card
        style={styles.cell}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardMedia>
          <img className="article-image" src={image} alt="" />
        </CardMedia>
        <CardTitle title={name} />
        <CardText>{description}</CardText>
      </Card>
    )
  }
}


export default connect()(Feature)
