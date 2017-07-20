import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

class CardItem extends Component {
  state = {
    zDepth: 1,
    image: null,
    loading: false
  }
  componentDidMount() {
    const { image } = this.props.item
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
  renderContents = (iFrame, text) => {
    const { image, loading } = this.state
    return (
      !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
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
      </CSSTransitionGroup>
    )
  }
  render() {
    const { dispatch, item } = this.props
    const values = item.values || {}
    const {
      backgroundColor,
      iFrame,
      link,
      margin,
      maxWidth,
      text,
      width,
      zDepth
    } = values
    const cardStyle = { width, maxWidth, zDepth, margin, backgroundColor }
    return (
      link ?
      <Card
        onTouchTap={() => dispatch(push(`${link}`))}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          ...cardStyle,
          cursor: 'pointer',
          flex: '1 1 auto'
        }}
      >
        {this.renderContents(iFrame, text)}
      </Card>
      :
      <Card
        zDepth={zDepth}
        style={{ ...cardStyle, flex: '1 1 auto' }}
        onTouchTap={() => console.log('card')}
      >
        {this.renderContents(iFrame, text)}
      </Card>
    )
  }
}

const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId)
  return {
    item,
    isFetching
  }
}

export default connect(mapStateToProps)(CardItem)
