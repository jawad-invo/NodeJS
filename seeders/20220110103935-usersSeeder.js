'use strict';

var fs = require('fs');
const csv = require('csv-parser');
var users = [];



module.exports = {
  up: async (queryInterface, Sequelize) => {
    fs.createReadStream('users.csv')
      .pipe(csv())
      .on('data', function (row) {
        const user = {
          name: row.name,
          email: row.email
        }
        users.push(user);
      }).on('end', function () {
        queryInterface.bulkInsert('users', users, {});
      })
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
