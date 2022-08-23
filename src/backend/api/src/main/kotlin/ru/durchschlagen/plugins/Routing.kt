package ru.durchschlagen.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import ru.durchschlagen.routes.*

fun Application.configureRouting() {
    routing {
        auctionRouting()
        lotsRouting()
        signInRouting()
        signUpRouting()
    }
}
