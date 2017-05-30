import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import ImageFormHor from '../../images/components/ImageFormHor'

class AdminBrandImage extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    expanded: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.brand || null
    const hasImage = image ? true : false
    const imageUrl = hasImage ? image : this.props.placeholdIt
    this.setState({ image: imageUrl, expanded: true })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true, image: nextProps.brand.image })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { error, handleSubmit, dispatch, brand, imageSize } = this.props
    return (
        <form
          onSubmit={handleSubmit(() => {
            const image = this.state.editing ? this.editor.handleSave() : brand.image
            const type = 'UPDATE_IMAGE'
            const update = { type, image }
            dispatch(fetchUpdate(brand._id, update))
            this.setState({ image: brand.image })
          })}
        >
          <Card
            expanded={this.state.expanded}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <CardActions>
              <RaisedButton
                onTouchTap={() => {
                  if (this.state.expanded) {
                    const update = { type: 'DELETE_IMAGE', image: brand.image }
                    dispatch(fetchUpdate(brand._id, update))
                  }
                  this.setState({ expanded: !this.state.expanded })
                }}
                type="button"
                label={this.state.expanded ? "Remove Brand Image" : "Add Brand Image"}
                labelColor="#ffffff"
                backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
                fullWidth={true}/>
            </CardActions>
            <CardActions expandable={true}>
              <ImageFormHor
                image={this.state.image}
                type="image/png"
                editing={this.editing}
                width={imageSize.width}
                height={imageSize.height}
                ref={this.setEditorRef}
              />
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </CardActions>
            <CardActions expandable={true}>
              <RaisedButton
                type="submit"
                label={this.state.submitted ? "Updated" : "Update"}
                labelColor="#ffffff"
                primary={this.state.submitted ? false : true}
                backgroundColor={this.state.submitted ? "#4CAF50" : null }
                fullWidth={true}
              />
            </CardActions>
          </Card>
        </form>
    )
  }
}

AdminBrandImage = reduxForm({
  form: 'adminBrandImage'
})(AdminBrandImage)

const mapStateToProps = (state) => {
  const isFetching = state.brand.isFetching
  const brand = isFetching ? null : state.brand
  return {
    isFetching,
    brand
  }
}

AdminBrandImage = connect(mapStateToProps)(AdminBrandImage)

export default AdminBrandImage
