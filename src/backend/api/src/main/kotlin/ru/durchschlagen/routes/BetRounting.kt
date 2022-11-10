package ru.durchschlagen.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.betRouting() {
    route("/bets") {
        get {
            logEndpointEntry(call)

            val error = """
                 [eventLoopGroupProxy-4-1] WARN  Exposed - Transaction attempt #0 failed: org.postgresql.util.PSQLException: ERROR: relation "bet" does not exist
 query: SELECT * FROM bet WHERE auction_id=1
 database: jdbc:postgresql://193.108.114.36:5432/durchschlagen,org.postgresql.Driver,public_user,123456
 error: relation "bet" does not exist
    caused by: org.postgresql.util.PSQLException: ERROR: relation "bet" does not exist
            """
            call.respond(error)
            call.response.status(HttpStatusCode.InternalServerError)

        }
    }
}