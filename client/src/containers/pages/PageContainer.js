import React from 'react'
import { connect } from 'react-redux'

import Page from '../../components/pages/Page'

const PageContainer = ({ isFetching, items, slug }) => (
  !isFetching && <Page items={items} slug={slug} />
)

const mapStateToProps = ({
  pages: { isFetching, items }
}, {
  params: { slug }
}) => ({ isFetching, items, slug })

export default connect(mapStateToProps)(PageContainer)
