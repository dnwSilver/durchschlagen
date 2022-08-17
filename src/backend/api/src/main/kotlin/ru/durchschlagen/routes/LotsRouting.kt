package ru.durchschlagen.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import ru.durchschlagen.models.Lot
import ru.durchschlagen.models.lotStorage

fun Route.lotsRouting() {
    route("/lots") {
        get {
            if (lotStorage.isNotEmpty()) {
                call.respond(lotStorage)
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
            val lastLot = lotStorage.maxByOrNull { it.id }
            val newLot = Lot((lastLot?.id ?: 0) + 1, body.name, body.preview)
            lotStorage.add(newLot)
            call.respond(newLot)
            call.response.status(HttpStatusCode.Created)
        }
        patch("{id?}") {
            val id = call.parameters["id"] ?: return@patch call.respond(HttpStatusCode.BadRequest)
            val lot = lotStorage.find { it.id.toString() == id } ?: return@patch call.respond(HttpStatusCode.NotFound)

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

@Serializable
data class RequestLotDTO(val name: String? = null, val preview: String? = null)
