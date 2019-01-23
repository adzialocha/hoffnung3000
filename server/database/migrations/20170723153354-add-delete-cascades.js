module.exports = {
  up: queryInterface => {
    queryInterface.addConstraint('places', ['animalId'], {
      name: 'place_animal_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'animals',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('events', ['animalId'], {
      name: 'event_animal_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'animals',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('resources', ['animalId'], {
      name: 'resource_animal_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'animals',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('resourcesEvents', ['resourceId'], {
      name: 'resources_events_resource_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'resources',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    queryInterface.addConstraint('resourcesEvents', ['eventId'], {
      name: 'resources_events_event_id_fkey',
      type: 'FOREIGN KEY',
      references: {
        field: 'id',
        table: 'events',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },
  down: queryInterface => {
    queryInterface.removeConstraint('places', 'place_animal_id_fkey')
    queryInterface.removeConstraint('events', 'event_animal_id_fkey')
    queryInterface.removeConstraint('resources', 'resource_animal_id_fkey')
    queryInterface.removeConstraint('resources', 'resources_events_resource_id_fkey')
    queryInterface.removeConstraint('resources', 'resources_events_event_id_fkey')
  },
}
