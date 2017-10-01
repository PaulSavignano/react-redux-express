import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminComponentSwitch from './AdminComponentSwitch'
import AdminSectionEditButtons from './AdminSectionEditButtons'

class AdminSection extends Component {
  render() {
    const {
      containerProps,
      dispatch,
      item,
      pageId,
      pageSlug,
      sectionProps
    } = this.props
    const { items } = item
    return (
      <div {...containerProps} className="AdminSection">
        <section
          onTouchTap={this.handleStartEdit}
          {...sectionProps}
        >
          {items.map(component => (
            <AdminComponentSwitch
              component={component}
              key={component.item._id}
              pageSlug={pageSlug}
            />
          ))}
        </section>
        <AdminSectionEditButtons
          dispatch={dispatch}
          item={item}
          pageId={pageId}
          pageSlug={pageSlug}
        />
      </div>
    )
  }
}

AdminSection.propTypes = {
  containerProps: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  sectionProps: PropTypes.object.isRequired
}

export default sectionContainer(AdminSection)
