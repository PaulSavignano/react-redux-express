import React from 'react'
import PropTypes from 'prop-types'

import brandContainer from '../../containers/brands/brandContainer'
import AppBarAdmin from './AppBarAdmin'
import ArticleStyleAdmin from './ArticleStyleAdmin'
import BusinessAdmin from './BusinessAdmin'
import BodyStyleAdmin from './BodyStyleAdmin'
import CardStyleAdmin from './CardStyleAdmin'
import FooterAdmin from './FooterAdmin'
import HeroStyleAdmin from './HeroStyleAdmin'
import ProductStyleAdmin from './ProductStyleAdmin'
import ThemeAdmin from './ThemeAdmin'
import TypographyAdmin from './TypographyAdmin'

import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

const fields = [{
  appBar: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'fontFamily', type: 'text' },
    { name: 'fontSize', type: 'text' },
    { name: 'fontWeight', type: 'text' },
    { name: 'letterSpacing', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'navColor', type: 'text' },
    { name: 'textShadow', type: 'text' },
  ],
  articleStyle: [
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ],
  bodyStyle: [
    { name: 'backgroundColor', type: 'text' }
  ],
  business: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'street', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'state', type: 'text' },
    { name: 'zip', type: 'text' },
    { name: 'facebook', type: 'text' },
    { name: 'github', type: 'text' },
    { name: 'google', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'twitter', type: 'text' },
    { name: 'yelp', type: 'text' },
    { name: 'youtube', type: 'text' }
  ],
  cardStyle: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ],
  footer: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'borderTop', type: 'text' },
    { name: 'borderBottom', type: 'text' },
    { name: 'margin', type: 'text' }
  ],
  heroStyle: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ],
  productStyle: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ],
  swipeableStyle: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ],
  theme: [
    { name: 'fontFamily', type: 'text' },
    { name: 'primary1Color', type: 'text' },
    { name: 'primary2Color', type: 'text' },
    { name: 'primary3Color', type: 'text' },
    { name: 'accent1Color', type: 'text' },
    { name: 'accent2Color', type: 'text' },
    { name: 'accent3Color', type: 'text' },
    { name: 'textColor', type: 'text' },
    { name: 'secondaryTextColor', type: 'text' },
    { name: 'alternateTextColor', type: 'text' },
    { name: 'canvasColor', type: 'text' },
    { name: 'borderColor', type: 'text' },
    { name: 'disabledColor', type: 'text' },
    { name: 'pickerHeaderColor', type: 'text' },
    { name: 'shadowColor', type: 'text' },
  ],
  typography: [
    { name: 'h1FontFamily', type: 'text' },
    { name: 'h1FontSize', type: 'text' },
    { name: 'h1FontWeight', type: 'text' },
    { name: 'h1LetterSpacing', type: 'text' },
    { name: 'h1LineHeight', type: 'text' },
    { name: 'h2FontFamily', type: 'text' },
    { name: 'h2FontSize', type: 'text' },
    { name: 'h2FontWeight', type: 'text' },
    { name: 'h2LetterSpacing', type: 'text' },
    { name: 'h2LineHeight', type: 'text' },
    { name: 'h3FontFamily', type: 'text' },
    { name: 'h3FontSize', type: 'text' },
    { name: 'h3FontWeight', type: 'text' },
    { name: 'h3LetterSpacing', type: 'text' }
  ]
}]

const BrandAdmin = ({
  _id,
  appBar,
  articleStyle,
  bodyStyle,
  business,
  cardStyle,
  footer,
  heroStyle,
  productStyle,
  swipeableStyle,
  theme,
  typography
}) => {
  return (
    <section className="page">
      <AppBarAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        image={appBarStyle.image}
        initialValues={appBarStyle.values}
      />
      <br/>
      <ArticleStyleAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...articleStyle.values,
          imageElevation: articleStyle.values.imageElevation && articleStyle.values.imageElevation.toString()
        }}
      />
      <br/>
      <BodyStyleAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={bodyStyle.values}
      />
      <br/>
      <BusinessAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={business.values}
      />
      <br/>
      <CardStyleAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...cardStyle.values,
          imageElevation: cardStyle.values.imageElevation && cardStyle.values.imageElevation.toString()
        }}
      />
      <br />
      <FooterAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        image={footer.image}
        initialValues={footer.values}
      />
      <br/>
      <HeroStyleAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...heroStyle.values,
          imageElevation: heroStyle.values.imageElevation && heroStyle.values.imageElevation.toString()
        }}
      />
      <br />
      <ProductAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...productStyle.values,
          imageElevation: productStyle.values.imageElevation && productStyle.values.imageElevation.toString()
        }}
      />
      <br/>
      <SwipeableStyleAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={swipeableStyle.values}
      />
      <br/>
      <ThemeAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
          fontFamily: theme.fontFamily,
          ...theme.palette
        }}
      />
      <br/>
      <TypographyAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={typography.values}
      />
      <br/><br/>
    </section>
  )
}

export default brandContainer(BrandAdmin)
