import React from 'react'
import { connect } from 'react-redux'
import AdminPageHero from './AdminPageHero'
import AdminPageCardAdd from './AdminPageCardAdd'
import AdminPageCardList from './AdminPageCardList'

const AdminPageEdit = (props) => {
  const { page, isFetching, cards } = props
  return (
    isFetching ? null :
    <main>
      <AdminPageHero page={page} />
      <AdminPageCardAdd page={page} />
      <AdminPageCardList page={page} cards={cards} />
    </main>
  )
}

const mapStateToProps = (state, ownProps) => {
  if (!state.pages.isFetching) {
    const page = state.pages.items.find(i => i.slug === ownProps.params.slug)
    const cards = page.components.filter(c => c.type === 'card') || []
    return {
      page,
      cards,
      isFetching: state.pages.isFetching
    }
  }
  return { isFetching: state.pages.isFetching }
}

export default connect(mapStateToProps)(AdminPageEdit)
