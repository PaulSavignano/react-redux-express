import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'material-ui/Card'


import AdminCarouselAdd from '../components/AdminCarouselAdd'
import AdminCarouselItem from '../components/AdminCarouselItem'

const imageSize = {
  width: 300,
  height: 100
}
const placeholdit = `https://placehold.it/${imageSize.width}x${imageSize.height}`

class AdminCarouselList extends Component {
  state = {
    open: false
  }
  render() {
    const { isFetching, page, items } = this.props
    return (
      isFetching ? null :
      <div style={{ margin: '130px 20px 20px 20px' }}>
        <Card>
          <AdminCarouselAdd page={page} imageSize={imageSize} placeholdit={placeholdit} />
          <div>
            {items.length < 1 ? null : items.map(item => (
              <AdminCarouselItem
                key={item._id}
                item={item}
                page={page}
                initialValues={item.values}
                imageSize={imageSize}
                placeholdit={placeholdit}
              />
            ))
            }
          </div>

        </Card>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.carousels.isFetching
  const items = isFetching ? null : state.carousels.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(AdminCarouselList)
