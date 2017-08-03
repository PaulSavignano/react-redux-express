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
      img.onload = () => this.setState({ image: src, loading: false })
      img.src = src
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
      iframe,
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
          {iframe &&
            <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
              <iframe
                title="iframe"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={iframe} frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          }
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
