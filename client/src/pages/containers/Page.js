import React from 'react'
import { connect } from 'react-redux'

import PageHero from '../components/PageHero'
import CardList from '../../cards/containers/CardList'

const Page = ({ isFetching, page, hero, cards }) => {
  console.log(page)
  return (
    !isFetching ?
    <div>
      <main>
        <CardList page={page} />
      </main>
    </div>
    :
    null
  )
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.params.slug || 'home'
  const isFetching = state.pages.isFetching ? true : false
  const page = isFetching ? {} : state.pages.items.find(item => item.slug === slug)
  return {
    isFetching,
    page
  }
}

export default connect(mapStateToProps)(Page)
