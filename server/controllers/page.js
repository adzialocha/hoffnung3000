import Page from '../models/page'
import { renderMarkdown } from '../services/marked'

export default {
  findOneWithSlug: (req, res, next) => {
    Page.findOne({
      where: {
        slug: req.params.resourceSlug,
      },
      rejectOnEmpty: true,
    })
      .then(page => {
        const convertedResponse = Object.assign({}, {
          contentHtml: renderMarkdown(page.content),
          id: page.id,
          title: page.title,
        })
        res.json(convertedResponse)
      })
      .catch(err => next(err))
  },
}
