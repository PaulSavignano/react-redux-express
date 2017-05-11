import React from 'react'
import { connect } from 'react-redux'

import AdminHero from '../../heros/containers/AdminHero'
import AdminCardList from '../../cards/containers/AdminCardList'
import AdminCarouselList from '../../carousels/containers/AdminCarouselList'


const AdminPageEdit = (props) => {
  const { isFetching, page } = props
  return (
    isFetching ? null :
    <main>
      <AdminHero page={page} />
      <AdminCardList page={page} />
      <AdminCarouselList page={page} />
    </main>
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.pages.isFetching ? true : false
  const page = isFetching ? {} : state.pages.items.find(item => item.slug === ownProps.params.slug)
  return {
    isFetching,
    page
  }
}

export default connect(mapStateToProps)(AdminPageEdit)
