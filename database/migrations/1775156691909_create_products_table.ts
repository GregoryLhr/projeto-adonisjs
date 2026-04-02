import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('name').notNullable()

      // relacionamento com categories
      table
        .uuid('category_id')
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')

      table.integer('unit_price').notNullable()

      // enum
      table.enu('unit_type', ['kg', 'g', 'l', 'ml', 'un']).notNullable().defaultTo('un')

      table.decimal('quantity', 10, 2).notNullable().defaultTo(0)
      table.decimal('minimum_quantity', 10, 2).notNullable().defaultTo(0)
      table.decimal('maximum_quantity', 10, 2).notNullable().defaultTo(0)

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}