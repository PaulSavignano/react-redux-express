import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { fetchSignout } from '../actions/users'

class Signout extends Component {
  componentWillMount() {
    this.props.dispatch(fetchSignout())
  }
  render() {
    return (
      <section>
        <Card>
          <CardText>Sorry to see you go!</CardText>
        </Card>
      </section>
    )
  }
}

export default connect()(Signout)
