import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'

import './header.css'
import headerContainer from '../../containers/header/headerContainer'
import HeaderBrand from './HeaderBrand'
import SearchBar from '../search/SearchBar'
import AppBarNavigation from './AppBarNavigation'
import DrawerNavigation from './DrawerNavigation'
import { toggleDrawer } from '../../actions/drawer'

class Header extends Component {
  handleDrawerToggle = () => this.props.dispatch(toggleDrawer())
  render() {
    const {
      appBar: {
        image,
        values: {
          backgroundColor,
          color,
          fontFamily: brandFontFamily,
          fontSize,
          fontWeight,
          imageBorderRadius,
          imageElevation,
          imagePosition,
          imageWidth,
          letterSpacing,
          name,
          navColor,
          phoneSize,
          showPhone,
          textShadow
        }
      },
      cartQty,
      dispatch,
      drawer,
      firstName,
      fontFamily,
      isAdmin,
      isOwner,
      pages,
      phone,
      primary1Color,
      searchOpen,
    } = this.props
    return (
      <header>
        <AppBar
          zDepth={backgroundColor === 'transparent' ? 0 : 1}
          iconStyleLeft={{ fill: navColor }}
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
          titleStyle={{ color: navColor, height: 'auto' }}
          style={{ backgroundColor, color: navColor }}
          title={
            <nav>
              {searchOpen ?
                <SearchBar
                  color={navColor}
                />
              :
              <div className="appbar">
                <HeaderBrand
                  backgroundColor={backgroundColor}
                  color={color}
                  className="appbar-brand"
                  fontFamily={brandFontFamily}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                  image={image}
                  imageBorderRadius={imageBorderRadius}
                  imageElevation={imageElevation}
                  imageClass={imagePosition}
                  imageWidth={imageWidth}
                  letterSpacing={letterSpacing}
                  name={name}
                  textShadow={textShadow}
                />
                <AppBarNavigation
                  cartQty={cartQty}
                  color={navColor}
                  dispatch={dispatch}
                  firstName={firstName}
                  fontFamily={fontFamily}
                  fontWeight={fontWeight}
                  pages={pages}
                  phone={phone}
                  phoneSize={phoneSize}
                  primary1Color={primary1Color}
                  searchOpen={searchOpen}
                  showPhone={showPhone}
                />
              </div>
              }
            </nav>
          }
        />
        <Drawer docked={false} open={drawer.open} onRequestChange={this.handleDrawerToggle}>
          <Paper
            className="drawer-brand"
            style={{ backgroundColor }}
            zDepth={backgroundColor === 'transparent' ? 0 : 1}
            onTouchTap={this.handleDrawerToggle}
          >
            <HeaderBrand
              backgroundColor={backgroundColor}
              color={color}
              className="drawer-brand-name"
              fontFamily={brandFontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              image={image}
              imageBorderRadius={imageBorderRadius}
              imageElevation={imageElevation}
              imageClass='drawer-image'
              letterSpacing={letterSpacing}
              name={name}
              textShadow={textShadow}
            />
          </Paper>
          {firstName && <div className="drawer-user">Hello, {firstName}</div>}
          <DrawerNavigation
            cartQty={cartQty}
            color={navColor}
            dispatch={dispatch}
            firstName={firstName}
            isAdmin={isAdmin}
            isOwner={isOwner}
            pages={pages}
            searchOpen={searchOpen}
          />
        </Drawer>
      </header>
    )
  }
}

Header.propTypes = {
  appBar: PropTypes.object.isRequired,
  cartQty: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  drawer: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  fontFamily: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isOwner: PropTypes.bool,
  pages: PropTypes.array,
  phone: PropTypes.string,
  phoneSize: PropTypes.string,
  primary1Color: PropTypes.string.isRequired,
  searchOpen: PropTypes.bool.isRequired
}

export default headerContainer(Header)
