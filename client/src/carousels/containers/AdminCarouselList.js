import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'


import AdminCarouselAdd from '../components/AdminCarouselAdd'
import AdminCarouselItem from '../components/AdminCarouselItem'

class AdminCarouselList extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { isFetching, page, carousels } = this.props
    return (
      isFetching ? null :
      <section>
        <Card style={{ margin: 20 }}>
          <AdminCarouselAdd page={page} />
          {carousels.length > 0 ?
            <div>
              {carousels.map(carousel => (
                <AdminCarouselItem
                  key={carousel._id}
                  carousel={carousel}
                  page={page}
                  initialValues={carousel.values}
                />
              ))}
            </div>
            :
            <h3>No items yet</h3>
          }
        </Card>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.carousels.isFetching
  const carousels = isFetching ? null : state.carousels.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    carousels
  }
}

export default connect(mapStateToProps)(AdminCarouselList)
