const bcrypt = require("bcrypt");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const createUser = async (username, firstName, lastName, password) => {
  const hashWord = await bcrypt.hash(password, 10);
  let temp = [
    {
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: hashWord,
    },
  ];
  return temp;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert(
    await createUser("admin", "Test", "test", "Admin1234"),
  );
  await knex("user").insert(
    await createUser("admin2", "Test2", "test2", "Admin1234"),
  );
};
