import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class CardItem extends Component {
  state = {
    zDepth: 1,
    loading: true,
    image: ''
  }
  componentDidMount() {
    if (this.props.item.image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = this.props.item.image
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
  render() {
    const { dispatch, item } = this.props
    const { image, values } = item
    return (
      this.state.loading ? null :
      values.link ?
      <Card
        onTouchTap={() => dispatch(push(`${values.link}`))}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ flex: '1 1 auto', width: values.width, cursor: 'pointer' }}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          {values.header ? <CardHeader title={values.header} /> : null }
          {image ? <CardMedia><img src={image} alt="item"/></CardMedia> : null }
          {values.iFrame ?
            <div style={{ position: 'relative', paddingBottom: '50%'}}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={values.iFrame} frameBorder="0" allowFullScreen>
              </iframe></div>
          : null}
          {values.title ? <CardTitle title={values.title} /> : null }
          {values.text ? <CardText>{values.text}</CardText> : null }
        </CSSTransitionGroup>
      </Card>
        :
        <Card
          style={{ flex: '1 1 auto', width: values.width }}
        >
          <CSSTransitionGroup
            transitionName="image"
            transitionAppear={true}
            transitionAppearTimeout={900}
            transitionEnter={false}
            transitionLeave={false}
          >
            {values.header ? <CardHeader title={values.header} /> : null }
            {image ? <CardMedia><img src={image} alt="item"/></CardMedia> : null }
            {values.iFrame ?
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={values.iFrame} frameBorder="0" allowFullScreen>
                </iframe></div>
            : null}
            {values.title ? <CardTitle title={values.title} /> : null }
            {values.text ? <CardText>{values.text}</CardText> : null }
          </CSSTransitionGroup>
        </Card>
    )
  }
}

export default connect()(CardItem)
