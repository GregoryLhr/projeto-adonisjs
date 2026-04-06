import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'moves'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      // produto
      table
        .uuid('product_id')
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')

      // usuário
      table
        .integer('user_id') // ⚠️ aqui segue seu user (number)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      // tipo (enum)
      table
        .enu('type', ['in', 'out'])
        .notNullable()

      table.decimal('quantity', 10, 2).notNullable()

      table.integer('unit_price').notNullable()

      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}