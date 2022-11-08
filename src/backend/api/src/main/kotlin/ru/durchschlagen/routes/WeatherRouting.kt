package ru.durchschlagen.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlin.random.Random

import kotlinx.serialization.Serializable

fun Route.weatherRouting() {
    //endpoint нужен для реализации SSRF атаки.
    route("/weather") {
        get("") {
            val temperature = Random.nextInt(-30, 30)

            val emoji = when (temperature) {
                in -30..-10 -> "🥶"
                in -10..10 -> "☺️"
                in 10..20 -> "😶‍🌫"
                in 20..30 -> "🥵"
                else -> "🤨"
            }
            call.respond(ResponseDTO(temperature = emoji))
        }
    }
}

@Serializable
data class ResponseDTO(val temperature: String = "")
