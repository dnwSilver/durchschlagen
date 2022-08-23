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
            setBody("""{"login":"Marius","password":"vivelafrance","firstName":"Marius","lastName":"Pontmercy","email":"Marius@Les@Misérables.fr"}""")
        }
        assertEquals(HttpStatusCode.Created, response.status)
        assertEquals(
            """{"tkn":"eyJpZCI6NCwibmFtZSI6Ik1hcml1cyBQb250bWVyY3kiLCJlbWFpbCI6Ik1hcml1c0BMZXNATWlzw6lyYWJsZXMuZnIiLCJyb2xlIjoiQ1VTVE9NRVIifQ=="}""",
            response.bodyAsText()
        )
    }

    @Test
    fun testSignUpConflict() = apiTestApplication {
        val response = client.post("/signup") {
            contentType(ContentType.Application.Json)
            setBody("""{"login":"Jean","password": "stars","firstName":"Javert","lastName":"Inspector","email":"Jean@Les@Misérables.fr"}""")
        }
        assertEquals(HttpStatusCode.Conflict, response.status)
    }

    @Test
    fun testSignUpWithoutPassword() = apiTestApplication {
        val response = client.post("/signup") {
            contentType(ContentType.Application.Json)
            setBody("""{"login":"Jean","firstName":"Javert","lastName":"Inspector","email":"Jean@Les@Misérables.fr"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, response.status)
        assertEquals("Missing password", response.bodyAsText())
    }
}
