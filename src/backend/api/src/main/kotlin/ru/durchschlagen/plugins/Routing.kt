package ru.durchschlagen.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import ru.durchschlagen.routes.auctionRouting
import ru.durchschlagen.routes.betRouting
import ru.durchschlagen.routes.lotsRouting
import ru.durchschlagen.routes.signInRouting
import ru.durchschlagen.routes.signUpRouting
import ru.durchschlagen.routes.temperatureRouting
import ru.durchschlagen.routes.weatherRouting

fun Application.configureRouting() {
    routing {
        auctionRouting()
        lotsRouting()
        signInRouting()
        signUpRouting()
        betRouting()
        weatherRouting()
        temperatureRouting()
    }
}
