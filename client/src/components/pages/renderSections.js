import React from 'react'

import Section from '../sections/Section'
import SectionSlideShow from '../sections/SectionSlideShow'
import SectionSwipeable from '../sections/SectionSwipeable'

const renderSections = ({ dispatch, sections, pageId, pageSlug }) => {
  const sectionList = (section) => {
    const { kind } = section.values
    switch(kind) {
      case 'Flex':
        return <Section
          dispatch={dispatch}
          key={section._id}
          item={section}
          pageId={pageId}
          pageSlug={pageSlug}
               />
     case 'SlideShow':
       return <SectionSlideShow
         dispatch={dispatch}
         key={section._id}
         item={section}
         pageId={pageId}
         pageSlug={pageSlug}
              />
      case 'Swipeable':
        return <SectionSwipeable
          dispatch={dispatch}
          key={section._id}
          item={section}
          pageId={pageId}
          pageSlug={pageSlug}
               />
      default:
        return <Section
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

export default renderSections
