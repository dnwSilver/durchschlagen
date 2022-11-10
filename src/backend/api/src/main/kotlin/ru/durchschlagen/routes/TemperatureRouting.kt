package ru.durchschlagen.routes

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Route.temperatureRouting() {
    //endpoint нужен для реализации SSRF атаки.
    route("/temperature") {
        post("") {
            logEndpointEntry(call)

            val body = call.receive<RequestTemperatureDTO>()

            val client = HttpClient(CIO)
            val response: HttpResponse = client.request(body.service)

            call.application.environment.log.info("GET /temperature ${response}")

            val stringBody: String = response.body()
            call.respond(stringBody)
            client.close()
        }
    }
}


@Serializable
data class RequestTemperatureDTO(val service: String)