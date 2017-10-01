import React from 'react'

import AdminSection from '../sections/AdminSection'
import AdminSectionSlideShow from '../sections/AdminSectionSlideShow'
import AdminSectionSwipeable from '../sections/AdminSectionSwipeable'

const AdminSectionSwitch = ({
  dispatch,
  pageId,
  pageSlug,
  section
}) => {
  switch(section.values.kind) {
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


export default AdminSectionSwitch
