package ru.durchschlagen.routes

import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Route.temperatureRouting() {
    //endpoint нужен для реализации SSRF атаки.
    route("/temperature") {
        post("") {
            val body = call.receive<RequestTemperatureDTO>()
            println("SERVICE " + body.service)

//            val client = HttpClient() {
//            }
//            val response: HttpResponse = client.request("https://ktor.io/") {
//                // Configure request parameters exposed by HttpRequestBuilder
//            }
//            val response = URL(body.service)
//            println(response.content)
//            call.respond(response.content)
        }
    }
}

@Serializable
data class RequestTemperatureDTO(val service: String)