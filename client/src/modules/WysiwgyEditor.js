import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { convertToRaw, EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


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
		const { isFetching, input, palette, fontFamily, fontFamily2, fontFamily3 } = this.props
    const colors = Object.keys(palette).map(key => palette[key]).filter((item, i, self) => i === self.indexOf(item))
    const toolBar = {
      fontFamily: {
        options: [fontFamily, fontFamily2, fontFamily3],
      },
      colorPicker: { colors },
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true }
    }
    const toolbarStyle = {
      backgroundColor: palette.canvasColor,
      color: '#000000'
    }
    const editorStyle = {
      borderBottom: '2px solid #F1F1F1',
      backgroundColor: '#F1F1F1'
    }
    return (
      isFetching ? null :
        <Editor
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          {...input}
          toolbarStyle={toolbarStyle}
          editorStyle={editorStyle}
          toolbar={toolBar}
        />
    )
  }
}

const mapStateToProps = ({ brand }) => ({
  isFetching: brand.isFetching,
  palette: brand.theme.palette,
  fontFamily: brand.theme.fontFamily,
  fontFamily2: brand.theme.fontFamily2,
  fontFamily3: brand.theme.fontFamily3
})

export default connect(mapStateToProps)(WysiwgyEditor)
