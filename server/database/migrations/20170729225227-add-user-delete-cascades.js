module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addConstraint('animals', {
        name: 'animal_user_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['userId'],
        references: {
          field: 'id',
          table: 'users',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('slots', {
        name: 'slot_place_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['placeId'],
        references: {
          field: 'id',
          table: 'places',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('slots', {
        name: 'slot_event_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['eventId'],
        references: {
          field: 'id',
          table: 'events',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('conversations', {
        name: 'conversation_animal_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['animalId'],
        references: {
          field: 'id',
          table: 'animals',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('messages', {
        name: 'message_animal_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['animalId'],
        references: {
          field: 'id',
          table: 'animals',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('messages', {
        name: 'message_conversation_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['conversationId'],
        references: {
          field: 'id',
          table: 'conversations',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeConstraint('animals', 'animal_user_id_fkey'),
      queryInterface.removeConstraint('slots', 'slot_place_id_fkey'),
      queryInterface.removeConstraint('slots', 'slot_event_id_fkey'),
      queryInterface.removeConstraint('conversations', 'conversation_animal_id_fkey'),
      queryInterface.removeConstraint('messages', 'message_animal_id_fkey'),
      queryInterface.removeConstraint('messages', 'message_conversation_id_fkey'),
    ])
  },
}
