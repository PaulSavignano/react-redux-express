import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'

import AdminCardEdit from './AdminCardEdit'

class AdminCardItem extends Component {
  state = {
    image: null,
    loading: false,
    open: false
  }
  componentWillMount() {
    const { image, editing } = this.props.item
    if (image.src) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = () => this.setState({ image: src, loading: false })
    }
    if (editing) this.setState({ open: true })
  }
  componentWillReceiveProps({ item }) {
    if (item.editing) this.setState({ open: true })
  }
  handleOpen = () => this.setState({ open: true})
  handleClose = () => this.setState({ open: false})
  renderContents = () => {
    const { image, loading } = this.state
    const { values: { color, header, iFrame, text }} = this.props.item
    return (
      !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        {header && <CardHeader title={header} style={{ color }} />}
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
        {text && <CardText>{renderHTML(text)}</CardText> }
      </CSSTransitionGroup>
    )
  }
  render() {
    const { open } = this.state
    const { dispatch, item, index } = this.props
    const { values } = item
    const width = values.width || null
    const maxWidth = values.maxWidth || null
    const zDepth = values.zDepth || null
    const margin = values.margin || null
    const backgroundColor = values.backgroundColor || null
    const cardStyle = { width, maxWidth, zDepth, margin, backgroundColor }
    return (
      <Card
        className="cards"
        zDepth={zDepth}
        style={{ ...cardStyle }}
        onTouchTap={this.handleOpen}
      >
        {this.renderContents()}
        {open &&
          <AdminCardEdit
            item={item}
            index={index}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            open={open}
          />
        }
      </Card>
    )
  }
}

const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => ({
  item: items.find(item => item._id === componentId),
  index: items.findIndex(item => item._id === componentId),
  isFetching
})

export default connect(mapStateToProps)(AdminCardItem)
