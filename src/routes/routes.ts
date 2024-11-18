import { Router } from "express";
import { signup } from "../controllers/signup";
import { login, logout } from "../controllers/login";
import { getUsers, hello } from "../controllers/user";

const routes = () => {
  const router = Router();
  router.post("/signup", signup);
  router.post("/login", login);
  router.post("/logout", logout);
  router.get("/getUsers", getUsers);
  router.get("/", hello);
  return router;
};
export { routes };
