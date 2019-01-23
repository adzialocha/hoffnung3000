module.exports = {
  up: queryInterface => {
    queryInterface.addConstraint('animals', ['userId'], {
      name: 'animal_user_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'users',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('slots', ['placeId'], {
      name: 'slot_place_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'places',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('slots', ['eventId'], {
      name: 'slot_event_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'events',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('conversations', ['animalId'], {
      name: 'conversation_animal_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'animals',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('messages', ['animalId'], {
      name: 'message_animal_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'animals',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('messages', ['conversationId'], {
      name: 'message_conversation_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'conversations',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },
  down: queryInterface => {
    queryInterface.removeConstraint('animals', 'animal_user_id_fkey')
    queryInterface.removeConstraint('slots', 'slot_place_id_fkey')
    queryInterface.removeConstraint('slots', 'slot_event_id_fkey')
    queryInterface.removeConstraint('conversations', 'conversation_animal_id_fkey')
    queryInterface.removeConstraint('messages', 'message_animal_id_fkey')
    queryInterface.removeConstraint('messages', 'message_conversation_id_fkey')
  },
}
