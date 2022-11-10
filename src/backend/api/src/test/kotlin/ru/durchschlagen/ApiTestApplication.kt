package ru.durchschlagen

import io.ktor.server.testing.*
import ru.durchschlagen.plugins.configureRouting
import ru.durchschlagen.plugins.configureSerialization

fun apiTestApplication(
    block: suspend ApplicationTestBuilder.() -> Unit
) {
    testApplication {
        application {
            configureRouting()
            configureSerialization()
        }
        block()
    }
}