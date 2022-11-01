package ru.durchschlagen.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import ru.durchschlagen.models.Lot
import ru.durchschlagen.models.lotLastId
import ru.durchschlagen.models.lotStorage

fun Route.lotsRouting() {
    authenticate("jwt-auth") {
        route("/lots") {
            get {
                val lots = lotStorage.filter { it.userId == call.getCurrentUserId() }
                if (lots.isNotEmpty()) {
                    call.respond(lots)
                } else {
                    call.respondText("No lots found", status = HttpStatusCode.OK)
                }
            }
            post {
                val body = call.receive<RequestLotDTO>()
                body.preview ?: return@post call.respondText(
                    "Missing preview", status = HttpStatusCode.BadRequest
                )
                body.name ?: return@post call.respondText(
                    "Missing name", status = HttpStatusCode.BadRequest
                )
                val newLot = Lot(++lotLastId, body.name, body.preview, call.getCurrentUserId())
                lotStorage.add(newLot)
                call.respond(newLot)
                call.response.status(HttpStatusCode.Created)
            }
            patch("{id?}") {
                val id = call.parameters["id"] ?: return@patch call.respond(HttpStatusCode.BadRequest)
                val lot =
                    lotStorage.find { it.id.toString() == id } ?: return@patch call.respond(HttpStatusCode.NotFound)

                val body = call.receive<RequestLotDTO>()
                body.name?.let { lot.name = it }
                body.preview?.let { lot.preview = it }
                call.respond(lot)
                call.response.status(HttpStatusCode.OK)
            }
            delete("{id?}") {
                val id = call.parameters["id"] ?: return@delete call.respond(HttpStatusCode.BadRequest)
                if (lotStorage.removeIf { it.id.toString() == id }) {
                    call.respondText("Lot removed correctly", status = HttpStatusCode.Accepted)
                } else {
                    call.respondText("Not Found", status = HttpStatusCode.NotFound)
                }
            }
        }
    }
}

public fun ApplicationCall.getCurrentUserId(): Int {
    val principal = this.principal<JWTPrincipal>()
    return principal!!.payload.getClaim("user_id").asInt()
}

@Serializable
data class RequestLotDTO(val name: String? = null, val preview: String? = null)
