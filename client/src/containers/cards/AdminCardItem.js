import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'

import AdminCardEdit from './AdminCardEdit'
import { startEdit } from '../../actions/cards'

class AdminCardItem extends Component {
  state = {
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
  componentWillReceiveProps({ item: { image, updatedAt } }) {
    if (this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image.src) return this.setState({ image: null })
  }
  render() {
    const { image, loading } = this.state
    const { dispatch, item, isFetching } = this.props
    const { values, editing } = item
    const { color, iFrame, text } = values
    const width = values.width || null
    const maxWidth = values.maxWidth || null
    const zDepth = values.zDepth || null
    const margin = values.margin || null
    const backgroundColor = values.backgroundColor || null
    const cardStyle = { width, maxWidth, zDepth, margin, backgroundColor }
    return (
      !isFetching && !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card
          zDepth={zDepth}
          style={{ ...cardStyle, flex: '1 1 auto' }}
          onTouchTap={() => dispatch(startEdit(item._id))}
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
          {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText>}
          {editing && <AdminCardEdit item={item} />}
        </Card>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => ({
  item: items.find(item => item._id === componentId),
  isFetching
})

export default connect(mapStateToProps)(AdminCardItem)
