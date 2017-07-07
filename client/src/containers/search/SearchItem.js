import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import renderHTML from 'react-render-html'

import { searchDelete } from '../../actions/search'

class SearchItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, item } = this.props
    const { values, image } = item
    const slug = item.slug === 'home' ? '' : item.slug
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => {
          dispatch(searchDelete())
          return dispatch(push(`/${slug}`))
        }}
        containerStyle={{ display: 'flex', flexFlow: 'row', margin: 16 }}
      >
        {item.image && <img src={image.src} alt="search result" style={{ maxHeight: 100 }}/>}
        <div>
          {values.name && <CardTitle>{values.name}</CardTitle>}
          {values.description && <CardText style={{paddingTop: 0}}>{values.description}</CardText>}
          {values.text && <CardText style={{paddingTop: 0}}>{renderHTML(values.text)}</CardText>}
        </div>
      </Card>
    )
  }
}


export default connect()(SearchItem)
