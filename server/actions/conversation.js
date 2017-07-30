import {
  ConversationBelongsToManyAnimal,
} from '../database/associations'

import Conversation from '../models/conversation'
import ConversationAnimal from '../models/conversationAnimal'

export function deleteConversations(where) {
  return new Promise((resolve, reject) => {
    Conversation.findAll({
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          required: true,
          where,
        },
      ],
    })
      .then(conversations => {
        const removePromises = conversations.map(conversation => {
          return Promise.all([
            ConversationAnimal.destroy({
              where: {
                conversationId: conversation.id,
              },
            }),
            conversation.destroy(),
          ])
        })

        return Promise.all(removePromises)
          .then(() => resolve())
      })
      .catch((err) => reject(err))
  })
}
