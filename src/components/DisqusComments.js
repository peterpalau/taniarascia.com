import React, { Component } from 'react'
import Disqus from 'disqus-react'
import urljoin from 'url-join'
import config from '../../data/SiteConfig'

class DisqusComments extends Component {
  state = {
    toasts: [],
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts
    this.setState({ toasts })
  }

  notifyAboutComment() {
    const toasts = this.state.toasts.slice()
    toasts.push({ text: 'New comment available!' })
    this.setState({ toasts })
  }

  render() {
    const { postNode } = this.props

    if (!config.disqusShortname) {
      return null
    }

    const post = postNode.frontmatter
    const url = urljoin(config.siteUrl, config.pathPrefix, postNode.fields.slug, '/')
    const disqusShortname = config.disqusShortname
    const disqusConfig = {
      url,
      identifier: postNode.fields.slug,
      title: post.title,
    }

    return <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  }
}

export default DisqusComments
