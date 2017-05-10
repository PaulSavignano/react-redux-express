import React from 'react'
import { connect } from 'react-redux'

import AdminPageHero from '../components/AdminPageHero'
import AdminCardList from '../../cards/containers/AdminCardList'


const AdminPageEdit = (props) => {
  const { isFetching, page } = props
  return (
    isFetching ? null :
    <main>
      <AdminPageHero page={page} />
      <AdminCardList page={page} />
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
