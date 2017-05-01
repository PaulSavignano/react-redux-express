import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class PageCard extends Component {
  state = {
    zDepth: 1,
    loading: true,
    image: ''
  }
  componentDidMount() {
    if (this.props.image) {
      this.setState({ loading: true })
      const img = new Image;
      const src = this.props.image
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
    const { dispatch, image, values } = this.props
    const { header, width, youtube, title, text, link } = values
    return (
      this.state.loading ? null :
      link ?
      <Card
        onTouchTap={() => dispatch(push(`${link}`))}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ flex: '1 1 auto', width: width, margin: 30, cursor: 'pointer' }}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
        >
          {header ? <CardHeader title={header} /> : null }
          {image ? <CardMedia><img src={image} alt="card"/></CardMedia> : null }
          {youtube ?
            <div style={{ position: 'relative', paddingBottom: '50%'}}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={youtube} frameBorder="0" allowFullScreen>
              </iframe></div>
          : null}
          {title ? <CardTitle title={title} /> : null }
          {text ? <CardText>{text}</CardText> : null }
        </CSSTransitionGroup>
        </Card>
        :
        <Card
          style={{ flex: '1 1 auto', width: width, margin: 30 }}
        >
          <CSSTransitionGroup
            transitionName="image"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}
          >
            {header ? <CardHeader title={header} /> : null }
            {image ? <CardMedia><img src={image} alt="card"/></CardMedia> : null }
            {youtube ?
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={youtube} frameBorder="0" allowFullScreen>
                </iframe></div>
            : null}
            {title ? <CardTitle title={title} /> : null }
            {text ? <CardText>{text}</CardText> : null }
          </CSSTransitionGroup>
      </Card>
    )
  }
}

export default connect()(PageCard)
