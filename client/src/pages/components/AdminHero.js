import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageEditor from '../../images/components/ImageEditor'
import { fetchUpdatePage } from '../actions/page'


const renderHeroField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

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

class AdminHero extends Component {
  state = {
    expanded: false,
    image: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    opacity: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
  }
  componentWillMount() {
    const { image } = this.props.component || false
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/1000x1000'
    this.setState({ expanded: hasImage, image: imageUrl })
  }
  handleExpandChange = (expanded) => this.setState({ expanded: expanded })
  handleToggle = (event, toggle) => this.setState({ visible: toggle })
  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 0.5)
    this.setState({
      preview: {
        img,
        scale: this.state.scale,
        borderRadius: this.state.borderRadius
      }
    })
    return img
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }
  handleOpacity = (e) => {
    const opacity = parseFloat(e.target.value)
    this.setState({ opacity })
  }
  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    })
  }
  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }
  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }
  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }
  handlePositionChange = position => {
    this.setState({ position })
  }
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onload = (e) => this.editor.loadImage(e.target.result)
    reader.readAsDataURL(file)
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { handleSubmit, dispatch, isFetching, page, component } = this.props
    return (
      isFetching ? null :
      <section>
        <form
          onSubmit={handleSubmit((values) => {
            const update = {
              type: component._id ? 'UPDATE_COMPONENT' : 'ADD_COMPONENT',
              component: {
                _id: component._id,
                type: 'hero',
                image: this.handleSave(),
                values
              }
            }
            dispatch(fetchUpdatePage(this.props.page._id, update))
          })}
          style={{ width: '100%', margin: 30}}
        >
          <Card
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <CardActions>
              <RaisedButton
                onTouchTap={() => {
                  if (this.state.expanded && component._id) {
                    const update = {
                      type: 'DELETE_COMPONENT',
                      component: {
                        _id: component._id
                      }
                    }
                    dispatch(fetchUpdatePage(page._id, update))
                    this.props.reset()
                  }
                  this.setState({ expanded: !this.state.expanded })
                }}
                type="button"
                label={this.state.expanded ? "Remove Hero" : "Add Hero"}
                labelColor="#ffffff"
                backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
                fullWidth={true}/>
            </CardActions>
            <CardMedia overlay={
              <div>
                <Field
                  component={renderHeroField}
                  inputStyle={styles.titleInput}
                  style={styles.titleDiv}
                  underlineShow={false}
                  name="title"
                  label="Hero Title"
                  type="text"
                  fullWidth={true}
                />
                <Field
                  component={renderHeroField}
                  inputStyle={styles.textInput}
                  style={styles.textDiv}
                  underlineShow={false}
                  name="text"
                  label="Hero Text"
                  type="text"
                  fullWidth={true}
                />
              </div>

            }
              overlayContentStyle={styles.overlayContainer}
              expandable={true}
            >
              <ImageEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                opacity={parseFloat(this.state.opacity)}
                width={1920}
                height={1080}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.borderRadius}
                onSave={this.handleSave}
                image={this.state.image}
              />

            </CardMedia>
            <CardText expandable={true}>
              <RaisedButton
                label="Choose an Image"
                labelPosition="before"
                style={{ marginBottom: 20 }}
                containerElement="label"
                fullWidth={true}
              >
                <input type="file" style={styles.imageInput} onChange={this.handleUpload} />
              </RaisedButton>
              <div style={styles.controlContainer}>
                <label>Zoom:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min="1"
                  max="2"
                  step="0.01"
                  defaultValue="1"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Opacity:</label>
                <input
                  name="opacity"
                  type="range"
                  onChange={this.handleOpacity}
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Border radius:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleBorderRadius}
                  min="0"
                  max="100"
                  step="1"
                  defaultValue="0"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>X Position:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleXPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.position.x}
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Y Position:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleYPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.position.y}
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Rotate:</label>
                <RaisedButton onTouchTap={this.rotateLeft} style={styles.rotateButton}>Left</RaisedButton>
                <RaisedButton onTouchTap={this.rotateRight} style={styles.rotateButton}>Right</RaisedButton>
              </div>
            </CardText>
            <CardActions>
              <RaisedButton
                label="Update"
                type="submit"
                primary={true}
                fullWidth={true}
              />
            </CardActions>
          </Card>
        </form>
      </section>
    )
  }
}

AdminHero = reduxForm({
  form: 'AdminHero',
})(AdminHero)

const mapStateToProps = (state, ownProps) => {
  const page = state.pages.items.find(p => p._id === ownProps.page._id)
  const component = page.components.find(c => c.type === 'hero') || {}
  return {
    isFetching: state.pages.isFetching,
    initialValues: component.values,
    component
  }
}

AdminHero = connect(mapStateToProps)(AdminHero)

export default AdminHero
