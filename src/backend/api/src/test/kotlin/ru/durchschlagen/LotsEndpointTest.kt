package ru.durchschlagen

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals

class LotsEndpointTest {
    @Test
    fun testSearchLotsSuccess() = apiTestApplication {
        val response = client.get("/lots")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """[{"id":1,"name":"Pan","preview":"~/img/lot/pan.jpeg"},{"id":2,"name":"A piece of bread","preview":"~/img/32.jpeg"}]""",
            response.bodyAsText()
        )
    }

    @Test
    fun testCreateLotSuccess() = apiTestApplication {
        val response = client.post("/lots") {
            contentType(ContentType.Application.Json)
            setBody("""{"name": "Apple Pen","preview": "~/img/lot/pen.jpeg"}""")
        }
        assertEquals(HttpStatusCode.Created, response.status)
        assertEquals("""{"id":3,"name":"Apple Pen","preview":"~/img/lot/pen.jpeg"}""", response.bodyAsText())
    }

    @Test
    fun testUpdateLotSuccess() = apiTestApplication {
        val response = client.patch("/lots/1") {
            contentType(ContentType.Application.Json)
            setBody("""{"name": "Apple Pen","preview": "~/img/lot/pen.jpeg"}""")
        }
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """{"id":1,"name":"Apple Pen","preview":"~/img/lot/pen.jpeg"}""", response.bodyAsText()
        )
    }

    @Test
    fun testDeleteLotSuccess() = apiTestApplication {
        val response = client.delete("/lots/1")
        assertEquals(HttpStatusCode.Accepted, response.status)
        assertEquals("Lot removed correctly", response.bodyAsText())
    }

    @Test
    fun testDeleteLotFailure() = apiTestApplication {
        val response = client.delete("/lots/100")
        assertEquals(HttpStatusCode.NotFound, response.status)
    }
}
