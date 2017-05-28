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
    const { isFetching, section, carousels } = this.props
    return (
      isFetching ? null :
      <div style={{ margin: '16px 32px' }}>
        <Card>
          {carousels.length < 1 ? null : carousels.map(carousel => (
            <AdminCarouselItem
              key={carousel._id}
              carousel={carousel}
              section={section}
              initialValues={carousel.values}
              imageSize={imageSize}
              placeholdit={placeholdit}
            />
          ))
          }
          <AdminCarouselAdd section={section} imageSize={imageSize} placeholdit={placeholdit} />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ carousels }, ownProps) => ({
  isFetching: carousels.isFetching,
  carousels: carousels.items.filter(carousel => carousel.sectionId === ownProps.section._id) || null
})

export default connect(mapStateToProps)(AdminCarouselList)
