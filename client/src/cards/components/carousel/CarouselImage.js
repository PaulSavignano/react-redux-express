import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ImageForm from '../../../images/components/ImageForm'
import { fetchUpdateCard } from '../../actions/card'

class CarouselImage extends Component {
  state = {
    expanded: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.item || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/280x60'
    this.setState({ expanded: hasImage, image: imageUrl })
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { handleSubmit, dispatch, page, card, item } = this.props
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          let image
          if (this.state.expanded) {
            if (this.editor.hasUpload()) {
              image = this.editor.handleSave()
            } else {
              image = card.image
            }
          } else {
            image = null
          }
          const update = {
            type: 'UPDATE_CAROUSEL_IMAGE',
            pageId: page._id,
            cardId: card._id,
            update: {
              itemId: item._id,
              image
            }
          }
          dispatch(fetchUpdateCard(update))
        }}
      >
        <CardActions>
          <RaisedButton
            onTouchTap={() => {
              if (this.state.expanded && item.image) {
                const update = {
                  type: 'DELETE_IMAGE',
                  pageId: page._id,
                  cardId: card._id,
                  update: {
                    itemId: item._id
                  }
                }
                dispatch(fetchUpdateCard(update))
              }
              this.setState({ expanded: !this.state.expanded })
            }}
            type="button"
            label={this.state.expanded ? "Remove Image" : "Add Image"}
            labelColor="#ffffff"
            backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
            fullWidth={true}
          />
        </CardActions>
        { !this.state.expanded ? null :
          <CardMedia>
            <ImageForm
              image={this.state.image}
              width={280}
              height={60}
              ref={this.setEditorRef}
            />
          </CardMedia>
        }
        { !this.state.expanded ? null :
          <CardActions>
            <RaisedButton type="submit" label="Update" primary={true} fullWidth={true} />
          </CardActions>
        }
      </form>
    )
  }
}

export default connect()(CarouselImage)
