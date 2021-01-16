'use strict'

const User = use('App/Models/User');

class LoginController {
    async redirect({ ally }) {
        await ally.driver('google').redirect()
    }

    async callback({ ally, auth }) {
        try {
            const glUser = await ally.driver('google').getUser()

            // user details to be saved
            const userDetails = {
                email: glUser.getEmail(),
                token: glUser.getAccessToken(),
                login_source: 'google'
            }

            // search for existing user
            const whereClause = {
                email: glUser.getEmail()
            }

            const user = await User.findOrCreate(whereClause, userDetails)
            await auth.login(user)

            return 'Logged in'
        } catch (error) {
            return 'Unable to authenticate. Try again later'
        }
    }
}

module.exports = LoginController