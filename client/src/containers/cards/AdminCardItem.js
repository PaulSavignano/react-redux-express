import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import AdminCardEdit from './AdminCardEdit'
import { startEdit } from '../../actions/cards'

class AdminCardItem extends Component {
  state = {
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image } = this.props.item
    if (image && image.src) {
      const img = new Image()
      const src = image.src
      img.onload = () => this.setState({ image: src, loading: false })
      img.src = src
    } else {
      this.setState({ loading: false })
    }
  }
  componentWillReceiveProps({ item: { image, updatedAt } }) {
    if (image && image.src && this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image || !image.src) return this.setState({ image: null })
  }
  render() {
    const { image, loading } = this.state
    const { dispatch, item, isFetching, values } = this.props
    const {
      flex,
      iframe,
      link,
      margin,
      text,
      width,
      zDepth
    } = values
    return (
      !isFetching && !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionEnter={false}
        transitionLeave={false}
        transitionAppearTimeout={600}
        style={{ flex, margin, width }}
      >
        <Card
          zDepth={zDepth}
          onTouchTap={() => dispatch(startEdit(item._id))}
          style={{ cursor: 'pointer' }}
        >
          {image && <CardMedia><img src={image} alt="card" /></CardMedia>}
          {iframe &&
            <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
              <iframe
                title="iframe"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={iframe} frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          }
          {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText>}
          {item.editing && <AdminCardEdit item={item} />}
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

export default connect(mapStateToProps)(AdminCardItem)
