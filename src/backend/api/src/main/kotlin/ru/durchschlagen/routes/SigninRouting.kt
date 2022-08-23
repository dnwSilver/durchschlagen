package ru.durchschlagen.routes

import UserRoleType
import getUserName
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.Base64
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import userStorage

fun Route.signInRouting() {
    route("/signin") {
        post {
            val userDTO = call.receive<RequestBodyDTO>()
            val login = userDTO.login ?: return@post call.respondText(
                "Missing login", status = HttpStatusCode.BadRequest
            )
            val password = userDTO.password ?: return@post call.respondText(
                "Missing password", status = HttpStatusCode.BadRequest
            )

            val user =
                userStorage.find { it.login == login && it.password == password } ?: return@post call.respondText(
                    "Incorrect login and password pair", status = HttpStatusCode.Unauthorized
                )


            call.respond(
                ResponseSignIn(
                    tkn = Base64.getEncoder().encodeToString(
                        Json.encodeToString(
                            ResponseUserDTO(
                                id = user.id,
                                name = getUserName(user.id),
                                email = user.email,
                                role = user.role
                            )
                        ).toByteArray()
                    )
                )
            )
            call.response.status(HttpStatusCode.Created)
        }

        delete("{id?}") {
            TODO("It will be soon")
        }
    }
}

@Serializable
data class RequestBodyDTO(val login: String? = null, val password: String? = null)

@Serializable
data class ResponseSignIn(val tkn: String)

@Serializable
data class ResponseUserDTO(val id: Int, val name: String, val email: String, val role: UserRoleType)