import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'material-ui/Card'


import AdminCarouselAdd from '../components/AdminCarouselAdd'
import AdminCarouselItem from '../components/AdminCarouselItem'

class AdminCarouselList extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { isFetching, page, items } = this.props
    return (
      isFetching ? null :
      <section>
        <Card style={{ margin: '100px 20px' }}>
          <AdminCarouselAdd page={page} />
          {items.length > 0 ?
            <div>
              {items.map(item => (
                <AdminCarouselItem
                  key={item._id}
                  item={item}
                  page={page}
                  initialValues={item.values}
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
  const items = isFetching ? null : state.carousels.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(AdminCarouselList)
