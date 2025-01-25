import { Request, Response } from "express";
import { createRoomSchema, joinRoomSchema } from "./room.validation";
import roomService from "./room.service";

class RoomController {
  // Create a new room
  async createRoom(req: Request, res: Response) {
    try {
      const validatedData = createRoomSchema.parse(req.body);
      const room = await roomService.createRoom(validatedData);
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid input" });
    }
  }

  // Join an existing room
  async joinRoom(req: Request, res: Response) {
    try {
      const validatedData = joinRoomSchema.parse(req.body);
      const room = await roomService.joinRoom(validatedData.roomCode, validatedData.username);
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid input" });
    }
  }

  async getAllRooms(req: Request, res: Response) {
    try {
      const rooms = await roomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  }
}

export default new RoomController();
