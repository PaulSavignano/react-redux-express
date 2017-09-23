import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import './product.css'
import productPageContainer from '../../containers/products/productPageContainer'
import Media from '../media/Media'
import H3 from '../typography/H3'
import P from '../typography/P'
import ProductButtons from './ProductButtons'
import formatPrice from '../../utils/formatPrice'

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
          name,
          price,
        }
      },
      primary1Color,
      productStyle: {
        values: {
          descriptionColor,
          detailColor,
          nameColor,
          nameTextShadow,
          mediaBorder,
          mediaBoxShadow,
          mediaElevation,
        }
      }
    } = this.props
    return (
      <div className="product-page" id={_id}>
        <section className="product-page-section">
          <Media
            border={mediaBorder}
            boxShadow={mediaBoxShadow}
            elevation={mediaElevation}
            iframe={iframe}
            image={image}
            flex="1 1 300px"
            margin="8px"
          />
          <div className="product-page-content">
            <div className="product-content">
              <div
                style={{ color: nameColor, textShadow: nameTextShadow }}
                className="product-heading"
              >
                <H3>{name}</H3>
                <H3>{formatPrice(price)}</H3>
              </div>
              {description.length < 10 ? null :
              <div style={{ color: descriptionColor }} className="product-description">
                <P>{renderHTML(description)}</P>
              </div>
              }
              {detail.length < 10 ? null :
              <div style={{ color: detailColor }} className="product-description">
                <P>{renderHTML(detail)}</P>
              </div>
              }
            </div>
            <div className="product-page-buttons">
              <ProductButtons
                dispatch={dispatch}
                form={`addToCard_${_id}`}
                productId={_id}
                primary1Color={primary1Color}
              />
            </div>
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


export default productPageContainer(ProductPage)
