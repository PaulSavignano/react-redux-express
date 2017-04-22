import React from 'react'
import { connect } from 'react-redux'

import PageHero from './PageHero'

const Page = (props) => {
  return (
    props.components ?
    <div>
      {props.components.map(component => {
        if (component.name === 'hero') {
          return (<PageHero key={component._id} contents={component.contents} />)
        }
      })}

    </div>
    :
    null
  )
}

const mapStateToProps = (state, ownProps) => {
  if (!state.pages.isFetching) {
    if (ownProps.params.slug) {
      return {
        page: state.pages.items.find(p => p.slug === ownProps.params.slug)
      }
    }
    return {
      components: state.pages.items.find(p => p.slug === 'home').components
    }
  }
  return {}
}

export default connect(mapStateToProps)(Page)
