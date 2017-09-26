import React from 'react'

import AdminSection from '../sections/AdminSection'
import AdminSectionSlideShow from '../sections/AdminSectionSlideShow'
import AdminSectionSwipeable from '../sections/AdminSectionSwipeable'

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
       return <AdminSectionSlideShow
         dispatch={dispatch}
         key={section._id}
         item={section}
         pageId={pageId}
         pageSlug={pageSlug}
              />
      case 'Swipeable':
        return <AdminSectionSwipeable
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
