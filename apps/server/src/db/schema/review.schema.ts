import { integer, text, timestamp, uuid, pgTable } from 'drizzle-orm/pg-core';
import { user } from './user.schema';
import { restaurants } from './restaurants.schema';
import { orders } from './orders.schema';

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id')
    .references(() => user.id)
    .notNull(),
  restaurantId: uuid('restaurant_id')
    .references(() => restaurants.id)
    .notNull(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .unique()
    .notNull(),
  driverId: uuid('driver_id').references(() => user.id),
  restaurantRating: integer('restaurant_rating').notNull(),
  driverRating: integer('driver_rating'),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
