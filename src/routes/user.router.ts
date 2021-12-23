import express = require('express');
import UserController from "../controller/user.controller";

const router = express();
router.post("/api/user", async (req, res, next) => {
    try {
      const clientController = new UserController();
      const response = await clientController.createUser(req.body);
      return res.status(200).json(response);
    }
    catch (error) {
      next(error)
    }
  });
  router.get("/api/user", async (req, res, next) => {
    try {
      const clientController = new UserController();
      const response = await clientController.getUser();
      return res.status(200).json(response);
    }
    catch (error) {
      next(error)
    }
  });

  router.delete("/api/user/:id", async (req, res, next) => {
    try {
      const clientController = new UserController();
      const response = await clientController.deleteUser(req.params.id);
      return res.status(200).json(response);
    }
    catch (error) {
      next(error)
    }
  });

  router.put("/api/user/:id", async (req, res, next) => {
    try {
      const clientController = new UserController();
      const response = await clientController.UpdateUser(req.body,req.params.id);
      return res.status(200).json(response);
    }
    catch (error) {
      next(error)
    }
  });
  router.post("/api/category", async (req, res, next) => {
    try {
      const clientController = new UserController();
      const response = await clientController.addCategory(req.body);
      return res.status(200).json(response);
    }
    catch (error) {
      next(error)
    }
  });
  export default router;