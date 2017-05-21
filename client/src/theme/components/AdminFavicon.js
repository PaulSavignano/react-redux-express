import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import ImageFormHor from '../../images/components/ImageFormHor'

class AdminTheme extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.theme || null
    const hasImage = image ? true : false
    const imageUrl = hasImage ? image : this.props.placeholdit
    this.setState({ image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true, image: nextProps.theme.image })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { error, handleSubmit, dispatch, theme, imageSize } = this.props
    return (
      <section>
        <form
          onSubmit={handleSubmit(() => {
            const image = this.state.editing ? this.editor.handleSave() : theme.image
            const type = 'UPDATE_IMAGE'
            const update = { type, image }
            dispatch(fetchUpdate(theme._id, update))
            this.setState({ image: theme.image })
          })}
        >
          <Card
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <ImageFormHor
              image={this.state.image}
              type="image/png"
              editing={this.editing}
              width={imageSize.width}
              height={imageSize.height}
              ref={this.setEditorRef}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            <CardActions>
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
      </section>
    )
  }
}

AdminTheme = reduxForm({
  form: 'adminFavicon'
})(AdminTheme)

const mapStateToProps = (state) => {
  const isFetching = state.theme.isFetching
  const theme = isFetching ? null : state.theme
  return {
    isFetching,
    theme
  }
}

AdminTheme = connect(mapStateToProps)(AdminTheme)

export default AdminTheme
