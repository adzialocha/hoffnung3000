module.exports = {
  up: (queryInterface) => {
    return Promise.all([
      queryInterface.renameTable('resourcesImages', 'objectsImages'),
      queryInterface.renameColumn('objectsImages', 'resourceName', 'objectType'),
      queryInterface.renameColumn('objectsImages', 'resourceId', 'objectId'),
    ])
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.renameColumn('objectsImages', 'objectType', 'resourceName'),
      queryInterface.renameColumn('objectsImages', 'objectId', 'resourceId'),
      queryInterface.renameTable('objectsImages', 'resourcesImages'),
    ])
  },
}
