import { CategorySchema } from '#database/schema'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { v4 as uuid } from "uuid"

export default class Category extends CategorySchema {

  @beforeCreate()
  public static assignUuid(category: Category) {
    if (!category.id) {
      category.id = uuid()
    }
  }

}