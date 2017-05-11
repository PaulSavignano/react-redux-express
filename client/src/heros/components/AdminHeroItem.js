import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field, reset } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageEditor from '../../images/components/ImageEditor'

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

class AdminHeroItem extends Component {
  state = {
    image: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    opacity: 1,
    rotate: 0,
    borderRadius: 0,
    editing: false,
    preview: null,
  }
  componentWillMount() {
    const { image } = this.props.hero || false
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/1920x1080'
    this.setState({ expanded: hasImage, image: imageUrl }, () => this.handleEditing())
  }
  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 1)
    this.setState({
      preview: {
        img,
        scale: this.state.scale,
        borderRadius: this.state.borderRadius
      }
    })
    this.setState({ editing: false })
    return img
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale }, () => this.handleEditing())
  }
  handleOpacity = (e) => {
    const opacity = parseFloat(e.target.value)
    this.setState({ opacity }, () => this.handleEditing())
  }
  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    }, () => this.handleEditing())
  }
  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    }, () => this.handleEditing())
  }
  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } }, () => this.handleEditing())
  }
  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } }, () => this.handleEditing())
  }
  handlePositionChange = position => {
    this.setState({ position }, () => this.handleEditing())
  }
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onload = (e) => this.editor.loadImage(e.target.result)
    reader.readAsDataURL(file)
    this.setState({ editing: true })
  }
  handleEditing = () => {
    const { position, scale, opacity, rotate, borderRadius } = this.state
    if (position.x === 0.5 && position.y === 0.5 && scale === 1 && opacity === 1 && rotate === 0 && borderRadius === 0) {
      this.setState({ editing: false })
    } else {
      this.setState({ editing: true })
    }
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    console.log('AdminHeroItem')
    const { error, handleSubmit, dispatch, page, hero } = this.props
    return (
        <form
          onSubmit={handleSubmit((values) => {
            let type, image
            if (this.state.editing) {
              console.log('has upload')
              type = 'UPDATE_ITEM_UPDATE_IMAGE'
              console.log(this.handleSave())
              image = this.handleSave()
            } else {
              type = 'UPDATE_ITEM'
              image = hero.image
            }
            const update = { type, image, values }
            dispatch(fetchUpdate(hero._id, update))
            this.setState({ image: hero.image })
          })}
          style={{ width: '100%'}}
        >
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
          <CardActions expandable={true}>
            <RaisedButton
              label="Update"
              type="submit"
              primary={true}
              fullWidth={true}
            />
          </CardActions>
        </form>
    )
  }
}


AdminHeroItem = compose(
  connect((state, props) => ({
    form: `hero_${props.page.slug}`,
    hero: state.heros.items.find(item => item.pageId === props.page._id)
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminHeroItem)

export default AdminHeroItem
