import React from 'react'
import PropTypes from 'prop-types'

import brandContainer from '../../containers/brands/brandContainer'
import BrandForm from './BrandForm'

const formFields = [{
  name: 'appBar',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'fontFamily', type: 'text' },
    { name: 'fontSize', type: 'text' },
    { name: 'fontWeight', type: 'text' },
    { name: 'imageBorderRadius', type: 'text' },
    { name: 'imageElevation', type: 'number', max: 24, min: 0 },
    { name: 'imagePosition', type: 'select', options: [ 'absolute', 'relative' ]},
    { name: 'imageWidth', type: 'text' },
    { name: 'letterSpacing', type: 'text' },
    { name: 'phoneSize', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'navColor', type: 'text' },
    { name: 'showPhone', type: 'select', options: [ 'true', 'false' ] },
    { name: 'textShadow', type: 'text' }
  ]
}, {
  name: 'articleStyle',
  fields: [
    { name: 'button1BackgroundColor', type: 'text' },
    { name: 'button2BackgroundColor', type: 'text' },
    { name: 'button1Border', type: 'text' },
    { name: 'button2Border', type: 'text' },
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'h1Align', type: 'select', options: ['left', 'center', 'right'] },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
    { name: 'pColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'imageElevation', type: 'number', max: 24, min: 0 },
  ]
}, {
  name: 'body',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
  ]
}, {
  name: 'business',
  fields: [
    { name: 'name', type: 'text' },
    { name: 'license', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'keywords', type: 'text' },
    { name: 'googleAnalyticsUA', type: 'text' },
    { name: 'stripePk', type: 'text' },
    { name: 'phone', type: 'phone' },
    { name: 'email', type: 'text' },
    { name: 'street', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'state', type: 'state' },
    { name: 'zip', type: 'zip' },
    { name: 'imageBorderRadius', type: 'text' },
    { name: 'facebook', type: 'text' },
    { name: 'github', type: 'text' },
    { name: 'google', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'twitter', type: 'text' },
    { name: 'yelp', type: 'text' },
    { name: 'youtube', type: 'text' }
  ]
}, {
  name: 'cardStyle',
  fields: [
    { name: 'button1BackgroundColor', type: 'text' },
    { name: 'button2BackgroundColor', type: 'text' },
    { name: 'button1Border', type: 'text' },
    { name: 'button2Border', type: 'text' },
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'elevation', type: 'number', max: 24, min: 0 },
    { name: 'flex', type: 'text' },
    { name: 'h1Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
    { name: 'pColor', type: 'text' },
    { name: 'margin', type: 'text' },
    { name: 'mediaBorder', type: 'text' }
  ]
}, {
  name: 'footer',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'borderTop', type: 'text' },
    { name: 'borderBottom', type: 'text' },
    { name: 'imageBorderRadius', type: 'text' },
    { name: 'imageElevation', type: 'number', max: 24, min: 0 },
    { name: 'imageMargin', type: 'text' }
  ]
}, {
  name: 'heroStyle',
  fields: [
    { name: 'alignItems', type: 'select', options: [ 'flex-start', 'center', 'flex-end' ] },
    { name: 'button1BackgroundColor', type: 'text' },
    { name: 'button2BackgroundColor', type: 'text' },
    { name: 'button1Border', type: 'text' },
    { name: 'button2Border', type: 'text' },
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'button1BorderColor', type: 'text' },
    { name: 'button2BorderColor', type: 'text' },
    { name: 'h1Align', type: 'text' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'text' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'text' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
    { name: 'pColor', type: 'text' },
    { name: 'minHeight', type: 'text' }
  ]
}, {
  name: 'palette',
  fields: [
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
    { name: 'shadowColor', type: 'text' }
  ]
}, {
  name: 'productStyle',
  fields: [
    { name: 'descriptionColor', type: 'text' },
    { name: 'detailColor', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'nameColor', type: 'text' },
    { name: 'nameTextShadow', type: 'text' },
    { name: 'margin', type: 'text' },
    { name: 'mediaElevation', type: 'number', max: 24, min: 0 },
  ]
}, {
  name: 'typography',
  fields: [
    { name: 'fontFamily', type: 'text' },
    { name: 'fontWeight', type: 'text' },
    { name: 'h1FontFamily', type: 'text' },
    { name: 'h1FontSize', type: 'text' },
    { name: 'h1LetterSpacing', type: 'text' },
    { name: 'h1Margin', type: 'text' },
    { name: 'h2FontFamily', type: 'text' },
    { name: 'h2FontSize', type: 'text' },
    { name: 'h2LetterSpacing', type: 'text' },
    { name: 'h2Margin', type: 'text' },
    { name: 'h3FontFamily', type: 'text' },
    { name: 'h3FontSize', type: 'text' },
    { name: 'h3LetterSpacing', type: 'text' },
    { name: 'h3Margin', type: 'text' },
    { name: 'lineHeight', type: 'text' },
    { name: 'pFontFamily', type: 'text' },
    { name: 'pFontSize', type: 'text' },
    { name: 'pLetterSpacing', type: 'text' },
    { name: 'pMargin', type: 'text' },
  ]
}]

const BrandAdmin = ({
  brand: {
    _id,
    appBar,
    articleStyle,
    body,
    business,
    cardStyle,
    footer,
    heroStyle,
    palette,
    productStyle,
    typography,
  },
  dispatch
}) => {
  const forms = [
    appBar,
    articleStyle,
    body,
    business,
    cardStyle,
    footer,
    heroStyle,
    palette,
    productStyle,
    typography,
  ]
  return (
    <div className="page">
      <section className="section-margin">
        {forms.map((form, i) => {
          const { backgroundImage, image, values } = form
          return (
            <BrandForm
              _id={_id}
              backgroundColor={palette.values.canvasColor}
              backgroundImage={backgroundImage}
              dispatch={dispatch}
              key={i}
              image={image}
              fields={formFields[i].fields}
              fontFamily={typography.values.fontFamily}
              form={formFields[i].name}
              initialValues={values}
            />
          )
        })}
      </section>
    </div>
  )
}

BrandAdmin.propTypes = {
  brand: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default brandContainer(BrandAdmin)
