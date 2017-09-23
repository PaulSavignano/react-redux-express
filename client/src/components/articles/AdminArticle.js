import React, { Component } from 'react'
import PropTypes from 'prop-types'

import articleContainer from '../../containers/articles/articleContainer'
import ArticleContent from './ArticleContent'
import { startEdit } from '../../actions/editItem'

class AdminArticle extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'ARTICLE',
    }))
  }
  render() {
    return (
      <article
        className="article"
        onTouchTap={this.handleStartEdit}
      >
        <ArticleContent {...this.props} />
      </article>
    )
  }
}

AdminArticle.propTypes = {
  articleStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default articleContainer(AdminArticle)
