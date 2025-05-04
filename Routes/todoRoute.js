import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todolist.js";
import {
  validateTodoInput,
  validateTodoId
} from "../middleware/todoMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Todo
 *     description: Todo list related operations
 */

/**
 * @openapi
 * /get_all:
 *   get:
 *     tags:
 *       - Todo
 *     summary: Get all todo list from database (no auth)
 *     responses:
 *       '200':
 *         description: Success
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get("/get_all", getAllTodos);

/**
 * @openapi
 * /add_todo:
 *   post:
 *     tags:
 *       - Todo
 *     summary: Add a new todo list (no auth)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo_image:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/icons/svg?seed=Katherine"
 *               todo_name:
 *                 type: string
 *                 example: "Doing Japanese exercise"
 *               todo_desc:
 *                 type: string
 *                 example: "learn basic kanji and basic grammar in conversation"
 *               todo_status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: Add todo successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/add_todo",
  validateTodoInput,
  createTodo
);

/**
 * @openapi
 * /update_todo/{id}:
 *   patch:
 *     tags:
 *       - Todo
 *     summary: Update todo list (no auth)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: todo ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo_image:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Wyatt"
 *               todo_name:
 *                 type: string
 *                 example: "Doing Japanese exercise updated"
 *               todo_desc:
 *                 type: string
 *                 example: "learn basic kanji and basic grammar in conversation updated"
 *               todo_status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: Todo list updated
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal server error
 */
router.patch(
  "/update_todo/:id",
  validateTodoId,
  validateTodoInput,
  updateTodo
);

/**
 * @openapi
 * /delete_todo/{id}:
 *   delete:
 *     tags:
 *       - Todo
 *     summary: Delete a todo (no auth)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todo deleted
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal server error
 */
router.delete(
  "/delete_todo/:id",
  validateTodoId,
  deleteTodo
);

export default router;
