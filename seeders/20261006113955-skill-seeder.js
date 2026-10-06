'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Skills',
      [
        {
          name: 'JavaScript',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'TypeScript',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'React',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Node.js',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Express.js',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Laravel',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'PHP',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'MySQL',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'PostgreSQL',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        ignoreDuplicates: true
      }
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(
      'Skills',
      {
        name: [
          'JavaScript',
          'TypeScript',
          'React',
          'Node.js',
          'Express.js',
          'Laravel',
          'PHP',
          'MySQL',
          'PostgreSQL'
        ]
      }
    );

  }
};