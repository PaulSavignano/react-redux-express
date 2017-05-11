import React from 'react'
import { connect } from 'react-redux'

import Hero from '../../heros/containers/Hero'
import CardList from '../../cards/containers/CardList'
import CarouselList from '../../carousels/containers/CarouselList'

const Page = ({ isFetching, page, hasHero, hasCards, hasCarousel }) => {
  console.log('hasHero', hasHero, 'hasCards', hasCards, 'hasCarousel', hasCarousel)
  return (
    !isFetching ?
    <div>
      {hasHero ? <Hero page={page} /> : null}
      <main>
        <CardList page={page} />
        {hasCarousel ? <CarouselList page={page} /> : null}
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
  const hasHero = isFetching ? false : state.heros.items.find(item => item.pageId === page._id) ? true : false
  const hasCards = isFetching ? false : state.cards.items.find(item => item.pageId === page._id) ? true : false
  const hasCarousel = isFetching ? false : state.carousels.items.find(item => item.pageId === page._id) ? true : false
  return {
    isFetching,
    page,
    hasHero,
    hasCards,
    hasCarousel
  }
}

export default connect(mapStateToProps)(Page)
