import React from 'react'

import Section from '../sections/Section'
import SectionSlideShow from '../sections/SectionSlideShow'
import SectionSwipeable from '../sections/SectionSwipeable'

const SectionSwitch = ({
  dispatch,
  pageId,
  pageSlug,
  section
}) => {
  switch(section.values.kind) {
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


export default SectionSwitch
