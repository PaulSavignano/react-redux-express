import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class CardItem extends Component {
  state = {
    zDepth: 1,
    loading: false,
    image: null
  }
  componentDidMount() {
    const { image } = this.props.card
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = (e) => {
        this.setState({ loading: false, image: src })
      }
    } else {
      this.setState({ loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  renderContents = () => {
    const { image, values } = this.props.card
    const { color, header, iFrame, title, textAlign, text, link } = values
    const textColor = { color }
    return (
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        {header && <CardHeader title={header} style={{ ...textColor }} />}
        {this.state.image && <CardMedia><img src={this.state.image} alt="card"/></CardMedia>}
        {iFrame ?
          <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
            <iframe
              title="iFrame"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={iFrame} frameBorder="0" allowFullScreen>
            </iframe>
          </div>
        : null}
        {text && <CardText>{renderHTML(text)}</CardText> }
      </CSSTransitionGroup>
    )
  }
  render() {
    const { dispatch, card } = this.props
    const { values } = card
    const width = values.width || null
    const maxWidth = values.maxWidth || null
    const zDepth = values.zDepth || null
    const margin = values.margin || null
    const backgroundColor = values.backgroundColor || null
    const cardStyle = { width, maxWidth, zDepth, margin, backgroundColor }
    return (
      !this.state.loading && values.link ?
      <Card
        onTouchTap={() => dispatch(push(`${values.link}`))}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
        style={{
          ...cardStyle,
          cursor: 'pointer'
        }}
      >
        {this.renderContents()}
      </Card>
      :
      <Card
        className="cards"
        zDepth={zDepth}
        style={{
          ...cardStyle
        }}
      >
        {this.renderContents()}
      </Card>
    )
  }
}

export default connect()(CardItem)
