package ru.durchschlagen.routes

import User
import UserRoleType
import getToken
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import userLastId
import userStorage

fun Route.signUpRouting() {
    route("/signup") {
        post {
            val body = call.receive<RequestSignUpDTO>()
            val login = body.login ?: return@post call.respondText(
                "Missing login", status = HttpStatusCode.BadRequest
            )
            val password = body.password ?: return@post call.respondText(
                "Missing password", status = HttpStatusCode.BadRequest
            )
            val email = body.email ?: return@post call.respondText(
                "Missing email", status = HttpStatusCode.BadRequest
            )

            val lastName = body.lastName ?: return@post call.respondText(
                "Missing lastname", status = HttpStatusCode.BadRequest
            )

            val firstName = body.firstName ?: return@post call.respondText(
                "Missing firstname", status = HttpStatusCode.BadRequest
            )

            if (userStorage.find { it.login == login || it.email == email } != null) {
                return@post call.respondText(
                    "User already created", status = HttpStatusCode.Conflict
                )
            }

            val user = User(
                id = ++userLastId,
                login = login,
                password = password,
                email = email,
                lastName = lastName,
                firstName = firstName,
                role = UserRoleType.CUSTOMER
            )

            userStorage.add(user)

            call.respond(hashMapOf("token" to getToken(user)))
        }
    }
}

@Serializable
data class RequestSignUpDTO(
    val login: String? = null,
    val password: String? = null,
    val firstName: String? = null,
    val lastName: String? = null,
    val email: String? = null,
)