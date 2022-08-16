package ru.durchschlagen

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals

class SignInEndpointTest {
    @Test
    fun testSignInSuccess() = apiTestApplication {
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
        assertEquals(
            """
                {
                    "tkn":"ewogICAgImlkIjogMSwKICAgICJuYW1lIjogIkplYW4gVmFsamVhbiIsCiAgICAiZW1haWwiOiAiTGVzQE1pc8OpcmFibGVzLmZyIiwKICAgICJyb2xlIjogImN1c3RvbWVyIgp9",
                }
            """.trimIndent(), response.bodyAsText()
        )
    }

    @Test
    fun testSignInWithoutLogin() = apiTestApplication {
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
    fun testSignInWithoutPassword() = apiTestApplication {
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
    fun testSignInFail() = apiTestApplication {
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
        assertEquals(HttpStatusCode.Unauthorized, response.status)
    }
}
