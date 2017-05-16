import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import ImageFormHor from '../../images/components/ImageFormHor'

const styles = {
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '3px 0'
  },
  control: {
    flex: '1 1 auto'
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  rotateButton: {
    margin: '0 0 0 8px',
    flex: '1 1 auto',
    height: 24
  },
  overlayContainer: {
    background: 'rgba(0, 0, 0, 0)'
  },
  titleDiv: {
    margin: '0 0 20px 0'
  },
  titleInput: {
    textAlign: 'center',
    fontSize: 36,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    padding: '8px 0 8px 0'
  },
  textDiv: {
  },
  textInput: {
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'rgba(255, 255, 255, .3)',
  },
  buttonContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  },
  button: {
    flex: '1 1 auto',
    margin: 8
  }
}

class AdminTheme extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.item || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'https://placehold.it/1000x1000'
    this.setState({ image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    nextProps.submitSucceeded ? this.setState({ submitted: true, image: nextProps.item.image }) : null
    nextProps.dirty ? this.setState({ submitted: false }) : null
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { error, handleSubmit, dispatch, item } = this.props
    return (
      <section>
        <form
          onSubmit={handleSubmit(() => {
            const image = this.state.editing ? this.editor.handleSave() : item.image
            const type = 'UPDATE_IMAGE'
            const update = { type, image }
            dispatch(fetchUpdate(item._id, update))
            this.setState({ image: item.image })
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
              width={200}
              height={200}
              ref={this.setEditorRef}
            />
            <CardActions>
              <RaisedButton
                type="submit"
                label="Update"
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
  const item = isFetching ? null : state.theme
  return {
    isFetching,
    item
  }
}

AdminTheme = connect(mapStateToProps)(AdminTheme)

export default AdminTheme
