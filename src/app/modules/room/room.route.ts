import express from "express";
import roomController from "./room.controller";

const router = express.Router();

router.post("/create", roomController.createRoom);
router.post("/join", roomController.joinRoom);
router.get("/all-room", roomController.getAllRooms);
export const RoomRoutes = router;
