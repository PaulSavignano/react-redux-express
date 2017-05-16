import React, { Component } from 'react'
import { connect } from 'react-redux'

import Hero from '../../heros/containers/Hero'
import CardList from '../../cards/containers/CardList'
import CarouselList from '../../carousels/containers/CarouselList'

class Page extends Component {
  state = {
    imageLoaded: false
  }
  componentDidMount() {
    this.props.hero ? null : this.setState({ imageLoaded: true })
  }
  handleImage = () => this.setState({ imageLoaded: true })
  render() {
    const { isFetching, page, hero, cards, carousel } = this.props
    console.log(page)
    return (
      isFetching ? null :
      <div>
        {hero ? <Hero page={page} handleImage={this.handleImage}/> : null}
        {!this.state.imageLoaded ? null :
          <main>
            {cards ? <CardList page={page} /> : null}
            {carousel ? <CarouselList page={page} /> : null}
          </main>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.params.slug)
  const page = state.pages.items.find(item => item.slug === ownProps.params.slug) || state.pages.items.find(item => item.slug === 'home')
  return {
    isFetching: state.pages.isFetching,
    page,
    hero: state.heros.items.find(item => item.pageId === page._id) || null,
    cards: state.cards.items.find(item => item.pageId === page._id) || null,
    carousel: state.carousels.items.find(item => item.pageId === page._id) || null
  }
}

export default connect(mapStateToProps)(Page)
