import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'

import AdminHeroAdd from '../components/AdminHeroAdd'
import AdminHeroItem from '../components/AdminHeroItem'

class AdminHero extends Component {
  state = {
    expanded: false
  }
  componentWillMount() {
    const hasHero = this.props.hero ? true : false
    this.setState({ expanded: hasHero })
  }
  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { isFetching, page, hero } = this.props
    return (
      isFetching ? null :
      <section>
        <Card
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
          style={{ margin: 20 }}
        >
          <AdminHeroAdd page={page} hero={hero} handleExpand={this.handleExpand} expanded={this.state.expanded}/>
          {!this.state.expanded ? null :
            <AdminHeroItem
              hero={hero}
              page={page}
              initialValues={hero.values}
            />
          }
        </Card>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.heros.isFetching
  const hero = isFetching ? {} : state.heros.items.find(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    hero
  }
}

export default connect(mapStateToProps)(AdminHero)
