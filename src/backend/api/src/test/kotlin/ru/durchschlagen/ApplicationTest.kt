package ru.durchschlagen

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals
import ru.durchschlagen.plugins.configureRouting
import ru.durchschlagen.plugins.configureSerialization

class ApplicationTest {
    @Test
    fun testSignInSuccess() = testApplication {
        //todo Написать hoc
        application {
            configureRouting()
            configureSerialization()
        }
        val response = client.post("/signin") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "login": "Jean", 
                        "password": "24601"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.Created, response.status)
    }

    @Test
    fun testSignInWithoutLogin() = testApplication {
        application {
            configureRouting()
            configureSerialization()
        }
        val response = client.post("/signin") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "password": "24601"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.BadRequest, response.status)
        assertEquals("Missing login", response.bodyAsText())
    }

    @Test
    fun testSignInWithoutPassword() = testApplication {
        application {
            configureRouting()
            configureSerialization()
        }
        val response = client.post("/signin") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "login": "Jean"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.BadRequest, response.status)
        assertEquals("Missing password", response.bodyAsText())
    }

    @Test
    fun testSignInFail() = testApplication {
        application {
            configureRouting()
            configureSerialization()
        }
        val response = client.post("/signin") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "login": "Jean",
                        "password": "24602"
                    }
                """.trimIndent()
            )
        }
        //todo подколючить kotest
        assertEquals(HttpStatusCode.Unauthorized, response.status)
    }
}