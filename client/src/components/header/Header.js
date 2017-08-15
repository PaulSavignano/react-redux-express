import React from 'react'

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
