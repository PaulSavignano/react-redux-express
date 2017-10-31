import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import H2 from '../typography/H2'
import { fetchAdd } from '../../actions/brand'

class BrandAdd extends Component {
  handleBrandAdd = () => {
    this.props.dispatch(fetchAdd())
  }
  render() {
    return (
      <section className="section-margin brand-add-page">
        <H2>Let's set up your brand!</H2>
        <RaisedButton
          onTouchTap={this.handleBrandAdd}
          label="Add Brand"
        />
      </section>
    )
  }
}

export default BrandAdd
