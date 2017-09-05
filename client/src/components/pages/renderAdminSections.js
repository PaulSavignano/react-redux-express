import React from 'react'

import AdminSection from '../sections/AdminSection'
import AdminSlideShow from '../sections/AdminSlideShow'
import AdminSwipeableSection from '../sections/AdminSwipeableSection'

const renderAdminSections = ({ dispatch, sections, pageId, pageSlug }) => {
  const sectionList = (section) => {
    const { kind } = section.values
    switch(kind) {
      case 'Flex':
        return <AdminSection
          dispatch={dispatch}
          key={section._id}
          item={section}
          pageId={pageId}
          pageSlug={pageSlug}
               />
     case 'SlideShow':
       return <AdminSlideShow
         dispatch={dispatch}
         key={section._id}
         item={section}
         pageId={pageId}
         pageSlug={pageSlug}
              />
      case 'Swipeable':
        return <AdminSwipeableSection
          dispatch={dispatch}
          key={section._id}
          item={section}
          pageId={pageId}
          pageSlug={pageSlug}
               />
      default:
        return <AdminSection
          dispatch={dispatch}
          key={section._id}
          item={section}
          pageId={pageId}
          pageSlug={pageSlug}
               />
    }
  }
  return sections.map(section => sectionList(section))
}

export default renderAdminSections
