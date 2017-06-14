import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class CardItem extends Component {
  state = {
    zDepth: 1,
    loading: true,
    image: ''
  }
  componentDidMount() {
    if (this.props.card.image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = this.props.card.image
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
        {header ? <CardHeader title={header} style={{ ...textColor }} /> : null }
        {image ? <CardMedia><img src={image} alt="card"/></CardMedia> : null }
        {iFrame ?
          <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
            <iframe
              title="iFrame"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={iFrame} frameBorder="0" allowFullScreen>
            </iframe>
          </div>
        : null}
        {!title ? null : <CardTitle title={title} titleStyle={{ ...textAlign, ...textColor }}  />  }
        {!text ? null : <CardText style={{ ...textColor }}>{renderHTML(text)}</CardText> }
      </CSSTransitionGroup>
    )
  }
  render() {
    const { dispatch, card } = this.props
    const { width, maxWidth, zDepth, margin, backgroundColor, color } = card.values
    console.log(width)
    const cardStyle = { width, maxWidth, zDepth, margin, backgroundColor, color }

    return (
      this.state.loading ? null :
      card.values.link ?
      <Card
        onTouchTap={() => dispatch(push(`${card.values.link}`))}
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
