import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const Media = ({
  image,
  iframe
}) => {
  return (
    <CSSTransitionGroup
      transitionName="image"
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnter={false}
      transitionLeave={false}
    >
      { image.src ?
        <CardMedia>
          <img src={image.src} alt="card"/>
        </CardMedia>
      :
        iframe ?
          <CardMedia>
            <div style={{ position: 'relative', paddingBottom: '50%' }}>
              <iframe
                title="iframe"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={iframe}
                frameBorder="0"
                allowFullScreen
              >
              </iframe>
            </div>
          </CardMedia>
        : null
      }
    </CSSTransitionGroup>
  )
}

Media.propTypes = {
  image: PropTypes.object,
  iframe: PropTypes.string,
}

export default Media
