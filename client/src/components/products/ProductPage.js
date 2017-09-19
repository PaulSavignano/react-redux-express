import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card'

import productPageContainer from '../../containers/products/productPageContainer'
import Media from '../media/Media'
import formatPrice from '../../utils/formatPrice'

import loadImage from '../images/loadImage'
import ProductButtons from './ProductButtons'

class ProductPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  render() {
    const {
      dispatch,
      item: {
        _id,
        image,
        values: {
          description,
          detail,
          iframe,
          mediaFlex,
          name,
          price,
        }
      },
      primary1Color,
      productStyle: {
        values: {
          descriptionColor,
          detailColor,
          flex,
          nameColor,
          nameTextShadow,
          margin,
          mediaBorder,
          mediaBoxShadow,
          mediaElevation,
        }
      }
    } = this.props
    return (
      <div className="product-page" id={_id}>
        <section className="product-section">
          <Media
            border={mediaBorder}
            boxShadow={mediaBoxShadow}
            elevation={mediaElevation}
            iframe={iframe}
            image={image}
            flex="1 1 300px"
            margin="8px"
          />
          <div className="product-content">
            <Card zDepth={0}>
              <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
                <CardTitle
                  className="product-card-title"
                  title={name}
                  titleColor={nameColor}
                  titleStyle={{ textShadow: nameTextShadow }}
                  subtitle={description}
                  subtitleColor={descriptionColor}
                />
                <CardTitle
                  className="product-card-title"
                  title={formatPrice(price)}
                />
              </div>
              <CardText
                className="product-card-text"
                style={{ color: detailColor }}
              >
                {renderHTML(detail)}
              </CardText>
              <CardActions className="product-card-actions">
                <ProductButtons
                  dispatch={dispatch}
                  form={`addToCard_${_id}`}
                  productId={_id}
                  primary1Color={primary1Color}
                />
              </CardActions>
            </Card>
          </div>
        </section>
      </div>
    )
  }
}

ProductPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired
}


export default productPageContainer(loadImage(ProductPage))
