import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int,
    val login: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val email: String,
)

val userStorage = mutableListOf(
    User(1, "Jean", "24601", "Jean", "Valjean", "Les@Misérables.fr"),
    User(2, "Javert", "stars", "Javert", "Inspector", "Javert@Misérables.fr"),
    User(3, "Gavroche", "thekingisdeatch", "Gavroche", "Thénardier", "Gavroche@Misérables.fr")
)

fun getUserName(userId: Int): String = userStorage
    .find {
        it.id == userId
    }
    .let {
        "${it?.firstName} ${it?.lastName}"
    }
