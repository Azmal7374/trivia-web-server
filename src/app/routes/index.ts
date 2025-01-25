import { Router } from 'express';
import { RoomRoutes } from '../modules/room/room.route';
import { CategoryRoutes } from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
 
  {
    path: '/room',
    route: RoomRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;