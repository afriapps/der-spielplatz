exports.up = function (knex, Promise) {
  return knex.schema.alterTable('posts', t => {
    t.string('slug');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('posts', t => {
    t.dropColumn('slug');
  });
};
