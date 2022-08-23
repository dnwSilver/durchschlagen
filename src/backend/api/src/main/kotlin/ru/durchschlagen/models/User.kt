import kotlinx.serialization.Serializable

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

enum class UserRoleType {
    ADMIN,
    CUSTOMER
}

var userLastId = 3

val userStorage = mutableListOf(
    User(
        id = 1,
        login = "Jean",
        password = "24601",
        firstName = "Jean",
        lastName = "Valjean",
        email = "Les@Misérables.fr",
        role = UserRoleType.CUSTOMER
    ),
    User(
        id = 2,
        login = "Javert",
        password = "stars",
        firstName = "Javert",
        lastName = "Inspector",
        email = "Javert@Misérables.fr",
        role = UserRoleType.CUSTOMER
    ),
    User(
        id = 3,
        login = "Gavroche",
        password = "thekingisdeatch",
        firstName = "Gavroche",
        lastName = "Thénardier",
        email = "Gavroche@Misérables.fr",
        role = UserRoleType.CUSTOMER
    )
)

fun getUserName(userId: Int): String = userStorage
    .find {
        it.id == userId
    }
    .let {
        "${it?.firstName} ${it?.lastName}"
    }
