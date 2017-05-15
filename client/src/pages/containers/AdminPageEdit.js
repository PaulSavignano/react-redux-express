import React from 'react'
import { connect } from 'react-redux'

import AdminHero from '../../heros/containers/AdminHero'
import AdminCardList from '../../cards/containers/AdminCardList'
import AdminCarouselList from '../../carousels/containers/AdminCarouselList'

const AdminPageEdit = ({ isFetching, page }) => (
  isFetching ? null :
  <main>
    <AdminHero page={page} />
    <AdminCardList page={page} />
    <AdminCarouselList page={page} />
  </main>
)

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.pages.isFetching,
  page: state.pages.items.find(item => item.slug === ownProps.params.slug)
})

export default connect(mapStateToProps)(AdminPageEdit)
