import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchProducts } from '../actions/product'

export class ProductSearch extends Component {
  render() {
    const { dispatch, searchProductsText } = this.props
    const styles = {
      search: {
        float: 'left',
      },
      expandableHolder: {
        width: '100%',
        maxWidth: '100%'
      },
      container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        minHeight: 'auto',
        alignItems: 'center'
      }
    }
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable" style={styles.container}>
            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="searchProducts">
              <i className="material-icons">search</i>
            </label>
            <div className="mdl-textfield__expandable-holder" style={styles.expandableHolder}>
              <input
                className="mdl-textfield__input"
                type="text"
                id="searchProducts"
                value={searchProductsText}
                ref="searchText"
                onChange={(e) => {
                  dispatch(searchProducts(e.target.value))
                }}
              />
              <label className="mdl-textfield__label" htmlFor="searchProducts">Expandable Input</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  showCompleted: state.showCompleted,
  searchProducts: state.searchProducts
})

export default connect(mapStateToProps)(ProductSearch)
