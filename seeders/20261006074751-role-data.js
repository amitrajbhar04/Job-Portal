'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        name: 'candidate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const existingRoles = await queryInterface.sequelize.query(
      `SELECT name FROM ${queryInterface.quoteIdentifier('Roles')}
       WHERE name IN ('candidate', 'employer')`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const existingNames = existingRoles.map(role => role.name);

    const newRoles = roles.filter(
      role => !existingNames.includes(role.name)
    );

    if (newRoles.length > 0) {
      await queryInterface.bulkInsert('Roles', newRoles);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', {
      name: ['candidate', 'employer'],
    });
  },
};