import React from 'react'
import { connect } from 'react-redux'

import Footer from '../../components/footer/Footer'

const FooterContainer = ({ isFetching, footer, business, updatedAt }) => (
  !isFetching && <Footer business={business} footer={footer} updatedAt={updatedAt} />
)

const mapStateToProps = ({ brand: { isFetching, footer, business, updatedAt } }) => ({
  isFetching,
  footer,
  business,
  updatedAt
})

export default connect(mapStateToProps)(FooterContainer)
