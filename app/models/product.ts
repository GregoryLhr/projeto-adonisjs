import { ProductSchema } from '#database/schema'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { v4 as uuid } from 'uuid'
import Category from './category.ts'

export default class Product extends ProductSchema {
  @beforeCreate()
  public static assignUuid(product: Product) {
    if (!product.id) {
      product.id = uuid()
    }
  }

  // relacionamento
  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: any
}
