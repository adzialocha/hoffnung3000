module.exports = {
  async up(queryInterface) {
    return Promise.all([
      queryInterface.renameColumn(
        'users',
        'firstname',
        'username'
      ),
      queryInterface.removeColumn(
        'users',
        'street'
      ),
      queryInterface.removeColumn(
        'users',
        'cityCode'
      ),
      queryInterface.removeColumn(
        'users',
        'city'
      ),
      queryInterface.removeColumn(
        'users',
        'lastname'
      ),
      queryInterface.removeColumn(
        'users',
        'country'
      ),
    ])
  },
  async down() {
    return Promise.resolve()
  },
}
