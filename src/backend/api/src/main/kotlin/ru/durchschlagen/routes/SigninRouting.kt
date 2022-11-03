package ru.durchschlagen.routes

import UserRoleType
import getToken
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import userStorage

fun Route.signInRouting() {
    route("/signin") {
        authenticate("jwt-auth") {
            get("/{id?}") {
                val userId = call.parameters["id"] ?: call.getCurrentUserId()
                val user =
                    userStorage.findLast { userId.toString().contains(it.id.toString()) } ?: return@get call.respondText(
                        "Incorrect user id", status = HttpStatusCode.NotFound
                    )

                call.respond(user)
            }
        }
        post {
            val body = call.receive<RequestBodyDTO>()

            val login = body.login ?: return@post call.respondText(
                "Missing login", status = HttpStatusCode.BadRequest
            )
            val password = body.password ?: return@post call.respondText(
                "Missing password", status = HttpStatusCode.BadRequest
            )

            val user =
                userStorage.find { it.login == login && it.password == password } ?: return@post call.respondText(
                    "Incorrect login and password pair", status = HttpStatusCode.Unauthorized
                )


            call.respond(hashMapOf("token" to getToken(user)))
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