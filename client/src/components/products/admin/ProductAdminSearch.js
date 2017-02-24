import React, { Component } from 'react'

class ProductAdminSearch extends Component {
  handleSearch = () => {
    const search = this.refs.searchText.value
    this.props.onSearch(search)
  }
  render() {
    const styles = {
      container: {
        margin: '0 auto'
      },
      search: {
        float: 'left',
      }
    }
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable" style={styles.search}>
          <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="productAdminSearch">
            <i className="material-icons">search</i>
          </label>
          <div className="mdl-textfield__expandable-holder">
            <input className="mdl-textfield__input" type="text" id="productAdminSearch" ref="searchText" onChange={this.handleSearch} />
            <label className="mdl-textfield__label" style={styles.input} htmlFor="sample-expandable">Expandable Input</label>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductAdminSearch
