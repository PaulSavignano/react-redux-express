import React, { Component } from 'react'
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
    console.log(this.props.value)
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
    this.setState({
      editorState,
    })
    this.props.onChange(html)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value === '') {
      this.setState({
        ...this.state,
      })
    }
  }

  render() {
    const { value, editorState } = this.state;
		const { input } = this.props;
    return (
        <Editor
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbarStyle={{ color: '#000000'}}
          {...input}

        />
    )
  }
}

export default WysiwgyEditor
