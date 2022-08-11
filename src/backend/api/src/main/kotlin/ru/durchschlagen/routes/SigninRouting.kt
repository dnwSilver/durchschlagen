package ru.durchschlagen.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import userStorage

@Serializable
data class RequestBodyDTO(val login: String? = null, val password: String? = null)

fun Route.signInRouting() {
    route("/signin") {
        post {
            val user = call.receive<RequestBodyDTO>()
            val login = user.login ?: return@post call.respondText(
                "Missing login",
                status = HttpStatusCode.BadRequest
            )
            val password = user.password ?: return@post call.respondText(
                "Missing password",
                status = HttpStatusCode.BadRequest
            )

            userStorage.find { it.login == login && it.password == password } ?: return@post call.respondText(
                "Incorrect login and password pair",
                status = HttpStatusCode.Unauthorized
            )

            call.response.status(HttpStatusCode.Created)
        }

        delete("{id?}") {
            TODO("It will be soon")
        }
    }
}