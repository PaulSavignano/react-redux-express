import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const articleContainer = (ComposedComponent) => {
  class ArticleContainer extends Component {
    state = {
      buttonProps: null,
      headingProps: null,
      mediaProps: null,
      paragraphProps: null
    }
    handleContent = (articleStyle, item) => {
      const {
        button1BackgroundColor,
        button2BackgroundColor,
        button1Border,
        button2Border,
        button1Color,
        button2Color,
        h1Align,
        h1Color,
        h1TextShadow,
        h2Align,
        h2Color,
        h2TextShadow,
        h3Align,
        h3Color,
        h3TextShadow,
        pColor,
        mediaBorder,
        mediaBoxShadow,
        mediaElevation,
      } = articleStyle
      const {
        image,
        values: {
          button1Text,
          button1Link,
          button2Text,
          button2Link,
          flexFlow,
          h1Text,
          h2Text,
          h3Text,
          iframe,
          mediaAlign,
          mediaFlex,
          mediaBorder: itemMediaBorder,
          mediaBoxShadow: itemMediaBoxShadow,
          mediaElevation: itemMediaElevation,
          pText,
          textFlex,
        }
      } = item
      const buttonProps = {
        button1BackgroundColor,
        button2BackgroundColor,
        button1Border,
        button2Border,
        button1Color,
        button2Color,
        button1Link,
        button2Link,
        button1Text,
        button2Text,
      }
      const headingProps = {
        className: 'article-heading',
        h1Align,
        h1Color,
        h1Text,
        h1TextShadow,
        h2Align,
        h2Color,
        h2Text,
        h2TextShadow,
        h3Align,
        h3Color,
        h3Text,
        h3TextShadow,
      }
      const mediaProps = {
        className: 'article-media',
        border: itemMediaBorder || mediaBorder,
        boxShadow: itemMediaBoxShadow || mediaBoxShadow,
        elevation: itemMediaElevation || mediaElevation,
        flex: mediaFlex,
        iframe,
        image,
      }
      const paragraphProps = {
        className: 'article-paragraph',
        color: pColor,
        text: pText,
      }
      this.setState({
        buttonProps,
        headingProps,
        mediaProps,
        paragraphProps
      })
    }
    componentWillMount() {
      const { articleStyle, item } = this.props
      this.handleContent(articleStyle, item)
    }
    render() {
      const {
        buttonProps,
        headingProps,
        mediaProps,
        paragraphProps
      } = this.state
      const {
        dispatch,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        isFetching,
        item,
      } = this.props
      const props = {
        buttonProps,
        dispatch,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        headingProps,
        item,
        mediaProps,
        paragraphProps,
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, articleStyle: { values }}
  }, {
    item: {
      image,
      values: {
        button1Text,
        h1Text,
        h2Text,
        h3Text,
        iframe,
        pText
      }
    }
  }) => ({
    articleStyle: values,
    hasButtons: button1Text ? true : false,
    hasHeading: h1Text || h2Text || h3Text ? true : false,
    hasMedia: image.src || iframe ? true : false,
    hasParagraph: pText.length > 9 ? true : false,
    isFetching,
  })
  ArticleContainer.propTypes = {
    articleStyle: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasHeading: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasParagraph: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(mapStateToProps)(ArticleContainer)
}

export default articleContainer
