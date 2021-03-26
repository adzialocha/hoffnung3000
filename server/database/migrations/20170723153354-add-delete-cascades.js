module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addConstraint('places', {
        name: 'place_animal_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['animalId'],
        references: {
          field: 'id',
          table: 'animals',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('events', {
        name: 'event_animal_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['animalId'],
        references: {
          field: 'id',
          table: 'animals',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('resources', {
        name: 'resource_animal_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['animalId'],
        references: {
          field: 'id',
          table: 'animals',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('resourcesEvents', {
        name: 'resources_events_resource_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['resourceId'],
        references: {
          field: 'id',
          table: 'resources',
        },
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('resourcesEvents', {
        name: 'resources_events_event_id_fkey',
        type: 'FOREIGN KEY',
        fields: ['eventId'],
        references: {
          field: 'id',
          table: 'events',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeConstraint('places', 'place_animal_id_fkey'),
      queryInterface.removeConstraint('events', 'event_animal_id_fkey'),
      queryInterface.removeConstraint('resources', 'resource_animal_id_fkey'),
      queryInterface.removeConstraint('resources', 'resources_events_resource_id_fkey'),
      queryInterface.removeConstraint('resources', 'resources_events_event_id_fkey'),
    ])
  },
}
