import Animal from '../models/animal'
import Conversation from '../models/conversation'
import Event from '../models/event'
import Image from '../models/image'
import Message from '../models/message'
import Place from '../models/place'
import Resource from '../models/resource'
import ResourceImage from '../models/resourceImage'
import Slot from '../models/slot'

export const ConversationBelongsToManyAnimal = Conversation.belongsToMany(Animal, {
  as: 'animals',
  foreignKey: 'conversationId',
  through: 'conversationsAnimals',
})

export const ConversationBelongsToAnimal = Conversation.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
})

export const ConversationHasManyMessage = Conversation.hasMany(Message, {
  as: 'messages',
  foreignKey: 'conversationId',
})

export const AnimalBelongsToManyConversation = Animal.belongsToMany(Conversation, {
  as: 'conversations',
  foreignKey: 'animalId',
  through: 'conversationsAnimals',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const MessageBelongsToConversation = Message.belongsTo(Conversation, {
  as: 'conversation',
  foreignKey: 'conversationId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const EventBelongsToAnimal = Event.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const EventHasManySlots = Event.hasMany(Slot, {
  as: 'slots',
  foreignKey: 'eventId',
})

export const EventBelongsToPlace = Event.belongsTo(Place, {
  as: 'place',
  foreignKey: 'placeId',
})

export const EventBelongsToManyImage = Event.belongsToMany(Image, {
  through: {
    model: ResourceImage,
    unique: false,
    scope: {
      resourceName: 'place',
    },
  },
  as: 'images',
  foreignKey: 'resourceId',
  constraints: false,
})

export const MessageBelongsToAnimal = Message.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const PlaceBelongsToAnimal = Place.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const PlaceHasManySlots = Place.hasMany(Slot, {
  as: 'slots',
  targetKey: 'placeId',
})

export const PlaceBelongsToManyImage = Place.belongsToMany(Image, {
  through: {
    model: ResourceImage,
    unique: false,
    scope: {
      resourceName: 'place',
    },
  },
  as: 'images',
  foreignKey: 'resourceId',
  constraints: false,
})

export const ResourceBelongsToAnimal = Resource.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const ResourceBelongsToManyEvent = Resource.belongsToMany(Event, {
  as: 'events',
  foreignKey: 'resourceId',
  through: 'resourcesEvents',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const EventBelongsToManyResource = Event.belongsToMany(Resource, {
  as: 'resources',
  foreignKey: 'eventId',
  through: 'resourcesEvents',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
})

export const ResourceBelongsToManyImage = Resource.belongsToMany(Image, {
  through: {
    model: ResourceImage,
    unique: false,
    scope: {
      resourceName: 'resource',
    },
  },
  as: 'images',
  foreignKey: 'resourceId',
  constraints: false,
})
