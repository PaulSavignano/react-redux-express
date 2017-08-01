import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

class CardItem extends Component {
  state = {
    zDepth: null,
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image, values } = this.props.item
    if (values.zDepth) this.setState({ zDepth: values.zDepth })
    if (image.src) {
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    } else {
      this.setState({ loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { image, loading, zDepth } = this.state
    const { dispatch, isFetching, item, values } = this.props
    const {
      flex,
      iFrame,
      link,
      margin,
      text,
      width,
    } = values
    const cursor = link && 'pointer'
    const cardStyle = { cursor }
    const navigation = link && { onTouchTap: () => dispatch(push(link)) }
    return (
      !isFetching && !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
        style={{ flex, margin, width }}
      >
        <Card
          {...navigation}
          zDepth={zDepth}
          onMouseEnter={link && this.handleMouseEnter}
          onMouseLeave={link && this.handleMouseLeave}
          style={cardStyle}
        >
          {image && <CardMedia><img src={image} alt="card"/></CardMedia>}
          {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText> }
        </Card>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId) || {}
  const values = item.values || {}
  return {
    item,
    isFetching,
    values
  }
}

export default connect(mapStateToProps)(CardItem)
