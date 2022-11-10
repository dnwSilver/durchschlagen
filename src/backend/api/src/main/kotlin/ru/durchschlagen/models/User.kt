import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.util.Date
import kotlinx.serialization.Serializable
import ru.durchschlagen.providers.readUser

enum class UserRoleType {
    ADMIN, CUSTOMER
}

@Serializable
data class User(
    val id: Int,
    val login: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: UserRoleType,
)

fun getUserName(userId: Int): String = readUser(userId.toString()).let {
    "${it?.firstName} ${it?.lastName}"
}

fun getToken(user: User): String = JWT.create()
    .withAudience("http://0.0.0.0:8080/")
    .withIssuer("http://0.0.0.0:8080/")
    .withClaim("user_id", user.id)
    .withClaim("login", user.login)
    .withClaim("username", getUserName(user.id))
    .withClaim("email", user.email)
    .withClaim("role", user.role.toString())
    .withExpiresAt(Date(System.currentTimeMillis() + 60 * 60 * 1000))
    .sign(Algorithm.HMAC256("secret"))