// middleware/todoMiddleware.js
import mongoose from 'mongoose';

export function validateTodoInput(req, res, next) {
  const { todo_name, todo_desc, todo_status, todo_image } = req.body;

  if (!todo_name || typeof todo_name !== 'string') {
    return res.status(400).json({ msg: 'todo_name is required and must be a string.' });
  }

  if (todo_desc != null && typeof todo_desc !== 'string') {
    return res.status(400).json({ msg: 'todo_desc, if provided, must be a string.' });
  }

  if (todo_status != null && typeof todo_status !== 'string') {
    return res.status(400).json({ msg: 'todo_status, if provided, must be a string.' });
  }

  if (todo_image != null && typeof todo_image !== 'string') {
    return res.status(400).json({ msg: 'todo_image, if provided, must be a URL string.' });
  }

  next();
}

export function validateTodoId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid todo ID.' });
  }
  next();
}
