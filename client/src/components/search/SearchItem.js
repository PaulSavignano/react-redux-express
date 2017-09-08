import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import renderHTML from 'react-render-html'

import Heading from '../typography/Heading'
import Media from '../media/Media'
import P from '../typography/P'
import { searchDelete } from '../../actions/search'

class SearchItem extends Component {
  state = {
    elevation: 1,
    slug: null
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleNavigation = () => {
    const { slug } = this.state
    const { dispatch, item: { item: _id }} = this.props
    dispatch(searchDelete())
    return dispatch(push(`/${slug}#${_id}`))
  }
  componentWillMount() {
    const { productSlug, pageSlug } = this.props
    const slug = productSlug ? `products/${productSlug}` : pageSlug
    this.setState({ slug })
  }
  render() {
    const {
      dispatch,
      item: {
        item: {
          _id,
          image,
          pageSlug,
          productSlug,
          values: {
            h1Text,
            h2Text,
            h3Text,
            iframe,
            pText,
            name,
            description,
            detail
          }
        }
      }
    } = this.props
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleNavigation}
        containerStyle={{ display: 'flex', flexFlow: 'row', margin: 16 }}
      >
        {image && image.src ?
          <Media
            image={image}
            iframe={iframe}
          />
        : null}
        <div>
          {h1Text || h2Text || h3Text ?
            <Heading
              h1Text={h1Text}
              h2Text={h2Text}
              h3Text={h3Text}
            />
          : null}
          {pText && <P>{renderHTML(pText)}</P>}
          {name && <CardTitle>{name}</CardTitle>}
          {description && <CardText style={{paddingTop: 0}}>{description}</CardText>}
          {detail && <CardText style={{paddingTop: 0}}>{detail}</CardText>}
        </div>

      </Card>
    )
  }
}

SearchItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}


export default SearchItem
