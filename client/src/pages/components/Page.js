import React from 'react'
import { connect } from 'react-redux'

import PageHero from './PageHero'
import PageCard from './PageCard'

const Page = ({ components }) => {
  console.log(components)
  return (
    components ?
    <div>
      {components.map(component => {
        if (component.type === 'hero') {
          return (<PageHero key={component._id} {...component} />)
        } else {
          return (<PageCard key={component._id} {...component} />)
        }
      })}

    </div>
    :
    null
  )
}

const mapStateToProps = (state, ownProps) => {
  if (!state.pages.isFetching) {
    const page = ownProps.params.slug ? ownProps.params.slug : 'home'
    const components = state.pages.items.find(p => p.slug === page).components
    return {
      components: state.pages.items.find(p => p.slug === 'home').components
    }
  }
  return {}
}

export default connect(mapStateToProps)(Page)
