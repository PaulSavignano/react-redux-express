import React from 'react'
import { connect } from 'react-redux'

import Footer from '../../components/footer/Footer'

const FooterContainer = ({ isFetching, footer, business }) => (
  !isFetching && <Footer business={business} footer={footer} />
)

const mapStateToProps = ({ brand: { isFetching, footer, business } }) => ({
  isFetching,
  footer,
  business
})

export default connect(mapStateToProps)(FooterContainer)
