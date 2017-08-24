import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import AdminArticleSection from '../articles/AdminArticleSection'
import AdminCardSection from '../cards/AdminCardSection'
import AdminHeroSection from '../heros/AdminHeroSection'
import AdminProductSection from '../products/AdminProductSection'
import AdminSwipeableSection from '../swipeables/AdminSwipeableSection'

const renderSections = (sections) => {
  const sectionList = (section) => {
    const { kind } = section
    switch(type) {
      case 'ArticleSection':
        return <AdminArticleSection key={section._id} section={section} pageId={pageId} />
      case 'CardSection':
        return <AdminCardSection key={section._id} section={section} pageId={pageId} />
      case 'HeroSection':
        return <AdminHeroSection key={section._id} section={section} pageId={pageId} />
      case 'ProductSection':
        return <AdminProductSection key={section._id} section={section} pageId={pageId} />
      case 'SwipeableSection':
        return <AdminSwipeableSection key={section._id} section={section} pageId={pageId} />
      default:
        return
    }
  }
  return sections.map(section => sectionList(section))
}

class AdminPage extends Component {
  componentWillMount() {
    window.scrollTo(0,0)
  }
  render() {
    const {
      dispatch,
      page
    } = this.props
    const { sections } = page
    const pageId = page._id
    return (
      <div style={{ minHeight: '80vh'}}>
        <div>
          {renderComponents(sections, pageId)}
        </div>
        <AdminSectionAdd
          dispatch={dispatch}
          pageId={pageId}
          pageSlug={page.slug}
        />
      </div>
    )
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
}

export default pageContainer(AdminPage)
