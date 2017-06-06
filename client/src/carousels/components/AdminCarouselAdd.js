import React from 'react'
import { connect } from 'react-redux'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../actions/index'

const AdminCarouselAdd = ({ dispatch, section, imageSize }) => (
  <Card className="cards" style={{ flex: `1 1 auto`, width: '100%', margin: 32  }}>
    <CardActions>
      <RaisedButton
        type="submit"
        label="Add New Carousel"
        primary={true}
        fullWidth={true}
        onTouchTap={() => {
          const add = { sectionId: section._id }
          dispatch(fetchAdd(add))
        }}
      />
    </CardActions>
  </Card>
)


export default connect()(AdminCarouselAdd)
