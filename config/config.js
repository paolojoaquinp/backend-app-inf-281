const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;

types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const dataBaseConfig = {
    'host': '127.0.0.1',
    'port': 5432,
    'database': 'inf_281_db',
    'user': 'postgres',
    'password': 'pacha300'
};
/*  const dataBaseConfig = {
    'host': 'bubble.db.elephantsql.com',
    'port': 5432,
    'database': 'asncyqls',
    'user': 'asncyqls',
    'password': 'UX-pgK6FQb3YuzSqoUVXq_EGw7Hg1F-m'
}; */
const db = pgp(dataBaseConfig);

module.exports = db;