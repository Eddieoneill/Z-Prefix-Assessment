/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const [admin] = await knex("user").where({ username: "admin" }).select("id");

  await knex("item").del();
  await knex("item").insert([
    {
      user_id: admin.id,
      item_name: "test",
      description: "this is a test item",
    },
  ]);
};
