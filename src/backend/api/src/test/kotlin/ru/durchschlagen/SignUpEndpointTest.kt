package ru.durchschlagen

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals

class SignUpEndpointTest {
    @Test
    fun testSignUpSuccess() = apiTestApplication {
        val response = client.post("/signup") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "login": "Javert",
                        "password: "stars",
                        "firstName: "Javert",
                        "lastName: "Inspector",
                        "email: "Javert@Les@Misérables.fr"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.Created, response.status)
        assertEquals(
            """
                {
                    "tkn":"ewogICAgImlkIjogMiwKICAgICJuYW1lIjogIkphdmVydCBJbnNwZWN0b3IiLAogICAgImVtYWlsIjogIkphdmVydEBNaXPDqXJhYmxlcy5mciIKICAgICJyb2xlIjogImN1c3RvbWVyIgp9",
                }
            """.trimIndent(), response.bodyAsText()
        )
    }

    @Test
    fun testSignUpConflict() = apiTestApplication {
        val response = client.post("/signup") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "login": "Jean",
                        "password: "stars",
                        "firstName: "Javert",
                        "lastName: "Inspector",
                        "email: "Jean@Les@Misérables.fr"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.Conflict, response.status)
    }

    @Test
    fun testSignInWithoutPassword() = apiTestApplication {
        val response = client.post("/signup") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "login": "Jean",
                        "firstName: "Javert",
                        "lastName: "Inspector",
                        "email: "Jean@Les@Misérables.fr"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.BadRequest, response.status)
        assertEquals("Missing password", response.bodyAsText())
    }
}
