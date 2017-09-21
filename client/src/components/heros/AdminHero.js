import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Card } from 'material-ui/Card'

import heroContainer from '../../containers/heros/heroContainer'
import HeroContent from './HeroContent'
import { startEdit } from '../../actions/editItem'

class AdminHero extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'HERO' }))
  }
  render() {
    const {
      dispatch,
      heroStyle,
      hasButtons,
      hasText,
      hasMedia,
      item,
      propsForParent,
      propsForChild
    } = this.props
    return (
      <div
        onTouchTap={this.handleStartEdit}
        {...propsForParent}
      >
        <Card
          zDepth={0}
          onTouchTap={this.handleStartEdit}
          {...propsForChild}
        >
          <HeroContent
            dispatch={dispatch}
            heroStyle={heroStyle}
            hasButtons={hasButtons}
            hasText={hasText}
            hasMedia={hasMedia}
            item={item}
          />
        </Card>
      </div>
    )
  }
}

AdminHero.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  heroStyle: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default heroContainer(AdminHero)
