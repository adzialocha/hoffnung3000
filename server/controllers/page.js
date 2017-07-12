import marked from 'marked'

import Page from '../models/page'

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
          contentHtml: marked(page.content),
          id: page.id,
          title: page.title,
        })
        res.json(convertedResponse)
      })
      .catch(err => next(err))
  },
}
