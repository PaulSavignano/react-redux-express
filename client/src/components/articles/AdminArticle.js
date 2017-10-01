import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './article.css'
import articleContainer from '../../containers/articles/articleContainer'
import ArticleSwitch from './ArticleSwitch'
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
        style={{ flex: this.props.item.values.articleFlex }}
        className="AdminArticle"
        onTouchTap={this.handleStartEdit}
      >
        <ArticleSwitch {...this.props} />
      </article>
    )
  }
}

AdminArticle.propTypes = {
  buttonProps: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  headingProps: PropTypes.object,
  item: PropTypes.object.isRequired,
  mediaProps: PropTypes.object,
  paragraphProps: PropTypes.object,

}

export default articleContainer(AdminArticle)
