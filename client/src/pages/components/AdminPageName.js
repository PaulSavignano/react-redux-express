import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchDelete } from '../actions/index'

const styles = {
  CardText: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center'
  },
  name: {
    flex: '1 1 auto'
  },
  RaisedButton: {
    alignSelf: 'flex-end'
  }
}

class AdminPageName extends Component {
  state = {
    zDepth: 1,
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
    const { _id, dispatch, name, slug } = this.props
    return (
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          className="cards"
        >
          <CardText style={styles.CardText}>
            <div style={styles.name}>{name}</div>
            <RaisedButton
              onTouchTap={() => dispatch(push(`/admin/pages/${slug}`))}
              label="Edit"
              primary={true}
            />
            <RaisedButton
              onTouchTap={() => dispatch(fetchDelete(_id))}
              label="X"
              primary={true}
              style={{ marginLeft: 16 }}
            />
          </CardText>
        </Card>
    )
  }
}


export default connect()(AdminPageName)
