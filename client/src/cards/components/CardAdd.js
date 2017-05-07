import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'
import { fetchAddCard, fetchDeleteCard } from '../actions/card'

class AdminCard extends Component {
  state = {
    zDepth: 1,
    expanded: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, page } = this.props
    return (
      <Card
        expanded={this.state.expanded}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ margin: 20 }}
      >
        <CardActions>
          <RaisedButton
            onTouchTap={() => {
              const item = { pageId: page._id, pageName: page.slug }
              dispatch(fetchAddCard(item))}
            }
            type="button"
            label="Add Card"
            labelColor="#ffffff"
            backgroundColor="#4CAF50"
            fullWidth={true}/>
        </CardActions>
      </Card>
    )
  }
}

export default connect()(AdminCard)
