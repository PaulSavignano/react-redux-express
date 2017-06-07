import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'


class RichTextMarkdown extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  state = {
    value: this.props.value === '' ? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(this.props.value, 'html'),
    typing: false,
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value === '') {
      this.setState({
        ...this.state,
        value: RichTextEditor.createEmptyValue()
      })
    }
  }

  handleChange = (value) => {
    this.setState({ value })
    let html = value.toString('html')
    this.props.onChange(html)
  }

  render() {
    const { value } = this.state;
    //Pass down i18n object to localise labels
		const { onBlur } = this.props;
    const toolbarConfig = {
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    };
    //editorStyle={{background: 'black', height: '300px'}} in next version to allow resizing on the fly
    return (<RichTextEditor value={value} onChange={this.handleChange} onBlur={onBlur} toolbarConfig={toolbarConfig} />);
  }
}

export default RichTextMarkdown
