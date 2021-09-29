import videoEmbed from 'video-embed'

export const renderer = {
  link: (href, title, text) => {
    if (href === null) {
      return text
    }
    // Embed Vimeo or YouTube when link was mentioned
    const embed = videoEmbed(href)
    if (embed) {
      return embed
    }
    // .. otherwise just render a normal link
    let out = `<a href="${href}"`
    if (title) {
      out += ` title=${title}`
    }
    out += `>${text}</a>`
    return out
  },
}
