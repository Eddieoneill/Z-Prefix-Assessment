const db = require("../db/db");

const getAll = async (req, res) => {
  try {
    const result = await db("item").select("*");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "server error" }, err);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("item").select("*").where("id", id);
    res.status(200).send(result);
  } catch {
    res.status(500).send({ message: "server error" });
  }
};

const postItem = async (req, res) => {
  try {
    const { user_id, item_name, description, quantity } = req.body;

    if (!user_id || !item_name || !description) {
      res.status(500).send({ message: "bad data" });
    }
    const newItem = await createItem({
      user_id,
      item_name,
      description,
      quantity,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).send({ message: "post failed" }, err);
  }
};

const createItem = (item) => {
  return db("item").insert(item).returning("*");
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { item_name, description, quantity } = req.body;

  try {
    const item = await db("item").select("*").where("id", id);
    if (!item.length) {
      res.status(500).send({ message: "Invalid Item Id" });
    }
    const result = await db("item")
      .select("*")
      .where("id", id)
      .update({
        item_name: item_name ? item_name : item.item_name,
        description: description ? description : item.description,
        quantity: quantity ? quantity : item.quantity,
      })
      .returning("*");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("item").where("id", id).del().returning("*");
    if (!deleted.length) {
      return res.status(404).send({ message: "item not found" });
    }
    res.status(200).send(deleted[0]);
  } catch {
    res.status(500).send({ message: "server error" });
  }
};

module.exports = { getAll, getById, postItem, updateById, deleteItem };
