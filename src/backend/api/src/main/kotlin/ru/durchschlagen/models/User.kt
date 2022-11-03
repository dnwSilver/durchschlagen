import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.util.Date
import kotlinx.serialization.Serializable

enum class UserRoleType {
    ADMIN, CUSTOMER
}

var userLastId = 3

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

val userStorage = mutableListOf(
    User(
        id = 1,
        login = "Jean",
        password = "24601",
        firstName = "Jean",
        lastName = "Valjean",
        email = "Les@Misérables.fr",
        role = UserRoleType.CUSTOMER
    ), User(
        id = 2,
        login = "Javert",
        password = "stars",
        firstName = "Javert",
        lastName = "Inspector",
        email = "Javert@Misérables.fr",
        role = UserRoleType.CUSTOMER
    ), User(
        id = 3,
        login = "Gavroche",
        password = "thekingisdeatch",
        firstName = "Gavroche",
        lastName = "Thénardier",
        email = "Gavroche@Misérables.fr",
        role = UserRoleType.CUSTOMER
    )
)

fun getUserName(userId: Int): String = userStorage.find {
    it.id == userId
}.let {
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