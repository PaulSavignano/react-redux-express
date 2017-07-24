import React from 'react'
import { connect } from 'react-redux'

import SectionList from '../../containers/sections/SectionList'
import NotFound from '../../components/NotFound'

const Page = ({ page, pageSlug }) => {
  return (
    (() => {
      switch (pageSlug) {
        case 'notFound':
          return <NotFound />
        default:
          return <SectionList page={page} />
        }
    })()
  )
}

const mapStateToProps = ({
  pages: { isFetching, items }
}, {
  params: { slug }
}) => {
  const indexSlug = slug || 'home'
  const page = items.find(item => item.slug === indexSlug)
  const pageSlug = page || 'notFound'
  return {
    isFetching,
    page,
    pageSlug
  }
}

export default connect(mapStateToProps)(Page)
