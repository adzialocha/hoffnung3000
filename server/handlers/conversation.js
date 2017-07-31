import {
  ConversationBelongsToAnimal,
  ConversationBelongsToManyAnimal,
} from '../database/associations'

import {
  deleteObjectsByAnimalId,
  deleteObjectsByIds,
  deleteObjectsByUserId,
} from './base'

import Conversation from '../models/conversation'
import ConversationAnimal from '../models/conversationAnimal'

const include = [
  {
    association: ConversationBelongsToManyAnimal,
    required: true,
  },
  {
    association: ConversationBelongsToAnimal,
  },
]

function deleteAssociations(conversations) {
  const promises = conversations.map(conversation => {
    return Promise.all([
      ConversationAnimal.destroy({
        where: {
          conversationId: conversation.id,
        },
      }),
      conversation.animal.destroy(),
      conversation.destroy(),
    ])
  })

  return Promise.all(promises)
}

export function deleteConversationsByUserId(userId) {
  return deleteObjectsByUserId(
    Conversation,
    userId,
    include,
    deleteAssociations
  )
}

export function deleteConversationsByAnimalId(animalId) {
  return deleteObjectsByAnimalId(
    Conversation,
    animalId,
    include,
    deleteAssociations
  )
}

export function deleteConversationsByIds(conversationIds) {
  return deleteObjectsByIds(
    Conversation,
    conversationIds,
    include,
    deleteAssociations
  )
}
