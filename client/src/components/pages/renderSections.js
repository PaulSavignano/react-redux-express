import React from 'react'

import Section from '../sections/Section'
import SlideShow from '../sections/SlideShow'
import SwipeableSection from '../sections/SwipeableSection'

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
       return <SlideShow
         dispatch={dispatch}
         key={section._id}
         item={section}
         pageId={pageId}
         pageSlug={pageSlug}
              />
      case 'Swipeable':
        return <SwipeableSection
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
