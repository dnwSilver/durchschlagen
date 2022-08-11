package ru.durchschlagen

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import ru.durchschlagen.plugins.configureRouting
import ru.durchschlagen.plugins.configureSecurity
import ru.durchschlagen.plugins.configureSerialization

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureSecurity()
        configureSerialization()
        configureRouting()
    }.start(wait = true)
}
