import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminComponentSwitch from './AdminComponentSwitch'
import AdminSectionEditButtons from './AdminSectionEditButtons'

class AdminSection extends Component {
  render() {
    const {
      dispatch,
      item,
      pageId,
      pageSlug,
      propsForChild,
      propsForParent,
      textColor
    } = this.props
    const { items } = item
    return (
      <div {...propsForParent}>
        <section
          onTouchTap={this.handleStartEdit}
          {...propsForChild}
          className="AdminSection"
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
          textColor={textColor}
        />
      </div>
    )
  }
}

AdminSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
  textColor: PropTypes.string
}

export default sectionContainer(AdminSection)
