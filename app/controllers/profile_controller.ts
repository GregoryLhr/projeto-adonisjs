import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }

  async uploadAvatar({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!avatar) {
      return serialize({
        error: 'Arquivo não enviado',
      })
    }

    const fileName = `${user.id}.${avatar.extname}`

    const filePath = app.makePath(`public/avatars/${fileName}`)

    await avatar.move(filePath, {
      overwrite: true,
    })

    await avatar.move(filePath, {
      overwrite: true,
    })

    // salva caminho no banco
    user.avatar = `/avatars/${fileName}`
    await user.save()

    return serialize({
      user: UserTransformer.transform(user),
    })
  }  
}
