import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { restaurants } from './restaurants.schema';
import { pgEnum } from 'drizzle-orm/pg-core';
import { user } from './user.schema';
import { numeric } from 'drizzle-orm/pg-core';
import { menuItems } from './menus..schema';

export const OrderStatusEnum = pgEnum('OrderStatusEnum', [
  'PENDING',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'DELIVERED',
  'PICKED_UP',
  'CANCELLED',
]);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => user.id)
    .notNull(),
  restaurantId: uuid('restaurant_id')
    .references(() => restaurants.id)
    .notNull(),
  driverId: uuid('driver_id')
    .references(() => user.id)
    .notNull(),
  status: OrderStatusEnum('status').default('PENDING').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  menuItemId: uuid('menu_item_id')
    .references(() => menuItems.id)
    .notNull(),
  quantity: numeric('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
