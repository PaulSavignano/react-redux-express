import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { convertToRaw, EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


class WysiwgyEditor extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }
  state = {
    editorState: null,
    typing: false,
  }
  componentWillMount() {
    if (this.props.value) {
      const blocksFromHtml = htmlToDraft(this.props.value);
      const contentBlocks = blocksFromHtml.contentBlocks;
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      const editorState = EditorState.createWithContent(contentState)
      this.setState({ editorState })
    }
  }
  onEditorStateChange = (editorState) => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({ editorState })
    this.props.onChange(html)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value === '') {
      this.setState({
        ...this.state,
        editorState: null
      })
    }
  }
  render() {
    const { editorState } = this.state
		const {
      backgroundColor,
      borderColor,
      brandFontFamily,
      isFetching,
      input,
      colors,
      fontFamily
    } = this.props
    const editorStyle = {
      border: '3px solid #F1F1F1',
    }
    const fonts = [
      fontFamily,
      brandFontFamily,
      'Dancing Script, cursive',
      'Futura, sans-serif'
    ]
    return (
      !isFetching &&
        <Editor
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          {...input}
          toolbarStyle={{ backgroundColor, color: '#000000', borderBottom: `1px solid ${borderColor}` }}
          wrapperStyle={{ border: `2px solid ${borderColor}` }}
          toolbar={{
            fontFamily: {
              options: fonts.filter((value, index, self) =>  self.indexOf(value) === index).sort(),
            },
            colorPicker: { colors },
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
        />
    )
  }
}

const mapStateToProps = ({
  brand: {
    appBar: { styles: { brandFontFamily }},
    isFetching,
    theme: {
      fontFamily,
      palette
    }
  }
}) => ({
  backgroundColor: palette.canvasColor,
  borderColor: palette.borderColor,
  brandFontFamily,
  colors: Object.keys(palette).map(key => palette[key]).filter((item, i, self) => i === self.indexOf(item)),
  fontFamily,
  isFetching,
})

export default connect(mapStateToProps)(WysiwgyEditor)
