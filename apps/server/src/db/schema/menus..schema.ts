import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { restaurants } from './restaurants.schema';
import { text } from 'drizzle-orm/pg-core';
import { decimal } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';

export const menuCategories = pgTable('menu_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  restaurantId: uuid('restaurant_id').references(() => restaurants.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const menuItems = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => menuCategories.id, {
    onDelete: 'cascade',
  }),
  restaurantId: uuid('restaurant_id').references(() => restaurants.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type ManueCategory = typeof menuCategories.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;
