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
    loading: false
  }
  componentWillMount() {
    const { image, values } = this.props.item
    if (values.zDepth) this.setState({ zDepth: values.zDepth })
    if (image.src) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleNavigation = () => this.props.dispatch(push(`${this.props.values.link}`))
  render() {
    const { image, loading, zDepth } = this.state
    const { isFetching, item } = this.props
    const values = item.values || {}
    const {
      backgroundColor,
      flex,
      iFrame,
      link,
      margin,
      text,
      width,
    } = values
    const cursor = link && 'pointer'
    const cardStyle = { backgroundColor, cursor  }
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
          onTouchTap={link && this.handleNavigation}
          zDepth={zDepth}
          onMouseEnter={link && this.handleMouseEnter}
          onMouseLeave={link && this.handleMouseLeave}
          style={cardStyle}
        >
          {image && <CardMedia><img src={image} alt="card"/></CardMedia>}
          {iFrame &&
            <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
              <iframe
                title="iFrame"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={iFrame} frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          }
          {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText> }
        </Card>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ cards: { items, isFetching }}, { componentId }) => {
  const item = items.find(item => item._id === componentId)
  return {
    item,
    isFetching
  }
}

export default connect(mapStateToProps)(CardItem)
