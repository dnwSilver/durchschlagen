package ru.durchschlagen.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import ru.durchschlagen.routes.auctionRouting
import ru.durchschlagen.routes.lotsRouting
import ru.durchschlagen.routes.signInRouting

fun Application.configureRouting() {

    routing {
        auctionRouting()
        lotsRouting()
        signInRouting()
    }
}
