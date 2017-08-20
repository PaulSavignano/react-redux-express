import React from 'react'
import PropTypes from 'prop-types'

import headerContainer from '../../containers/header/headerContainer'
import HeaderAppBar from './HeaderAppBar'
import HeaderDrawer from './HeaderDrawer'

const Header = (props) => (
  <header>
    <HeaderAppBar {...props} />
    <HeaderDrawer {...props} />
  </header>
)

export default headerContainer(Header)
