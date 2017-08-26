import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AdminItemForm from '../forms/AdminItemForm'
import pageContainer from '../../containers/pages/pageContainer'
import AdminSectionAdd from '../sections/AdminSectionAdd'
import AdminArticleSection from '../articles/AdminArticleSection'
import AdminCardSection from '../cards/AdminCardSection'
import AdminHeroSection from '../heros/AdminHeroSection'
import AdminProductSection from '../products/AdminProductSection'
import AdminSwipeableSection from '../swipeables/AdminSwipeableSection'

// Finish setting sections to items

const renderSections = ({ dispatch, sections, pageId, pageSlug }) => {
  const sectionList = (section) => {
    const { kind } = section
    switch(kind) {
      case 'ArticleSection':
        return <AdminArticleSection dispatch={dispatch} key={section._id} item={section.section} pageId={pageId} pageSlug={pageSlug} />
      case 'CardSection':
        return <AdminCardSection dispatch={dispatch} key={section._id} item={section.section} pageId={pageId} pageSlug={pageSlug}/>
      case 'HeroSection':
        return <AdminHeroSection dispatch={dispatch} key={section._id} item={section.section} pageId={pageId} pageSlug={pageSlug}/>
      case 'ProductSection':
        return <AdminProductSection dispatch={dispatch} key={section._id} item={section.section} pageId={pageId} pageSlug={pageSlug}/>
      case 'SwipeableSection':
        return <AdminSwipeableSection dispatch={dispatch} key={section._id} item={section.section} pageId={pageId} pageSlug={pageSlug}/>
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
      editItem,
      page
    } = this.props
    const { sections } = page
    const pageId = page._id
    const pageSlug = page.slug
    return (
      <div style={{ minHeight: '80vh'}}>
        <div>
          {renderSections({
            dispatch,
            sections,
            pageId,
            pageSlug
          })}
        </div>
        <AdminSectionAdd
          dispatch={dispatch}
          pageId={pageId}
          pageSlug={page.slug}
        />

        <AdminItemForm />
      </div>
    )
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editItem: PropTypes.object,
  page: PropTypes.object.isRequired,
}

export default pageContainer(AdminPage)
