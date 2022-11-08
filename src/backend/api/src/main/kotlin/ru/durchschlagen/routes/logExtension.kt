package ru.durchschlagen.routes

import io.ktor.server.application.*
import io.ktor.server.request.*

fun logEndpointEntry(call: ApplicationCall) {
    call.application.environment.log.info("${call.request.httpMethod.value} ${call.request.path()}")
}