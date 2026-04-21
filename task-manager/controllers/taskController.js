const pool = require("../config/db");

// GET ALL
exports.getAllTasks = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  res.json(result.rows);
};

// GET BY ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  res.json(result.rows[0]);
};

// CREATE
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title tidak boleh kosong" });
  }

  const result = await pool.query(
    "INSERT INTO tasks (title, description) VALUES ($1,$2) RETURNING *",
    [title, description]
  );

  res.status(201).json(result.rows[0]);
};

// UPDATE
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  const check = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

  if (check.rows.length === 0) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  const result = await pool.query(
    "UPDATE tasks SET title=$1, description=$2, is_completed=$3 WHERE id=$4 RETURNING *",
    [title, description, is_completed, id]
  );

  res.json(result.rows[0]);
};

// DELETE
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  const check = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

  if (check.rows.length === 0) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);

  res.json({ message: "Task berhasil dihapus" });
};