import React from 'react'
import { connect } from 'react-redux'
import AdminHero from '../components/AdminHero'
import CardAdd from '../../cards/components/CardAdd'
import CardList from '../../cards/components/CardList'
import AdminCardList from '../components/AdminCardList'
import CompSelect from '../components/CompSelect'

const AdminPageEdit = (props) => {
  const { isFetching, page, cards } = props
  return (
    isFetching ? null :
    <main>
      <AdminHero page={page} />
      <CardAdd page={page} />
      <CardList page={page} cards={cards} />
      <CompSelect page={page} />
    </main>
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.pages.isFetching || state.cards.isFetching ? true : false
  const page = isFetching ? {} : state.pages.items.find(item => item.slug === ownProps.params.slug)
  const cards = isFetching ? [] : state.cards.items.filter(item => item.pageId === page._id)
  return {
    isFetching,
    page,
    cards
  }
}

export default connect(mapStateToProps)(AdminPageEdit)
