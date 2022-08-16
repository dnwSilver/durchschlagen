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
        assertEquals(HttpStatusCode.Created, response.status)
        assertEquals(
            """
                {
                    "lots": [
                        {
                            "id": 1,
                            "name": "Pan",
                            "preview": "~/img/lot/pan.jpeg"
                        }
                    ]
                }
            """.trimIndent(), response.bodyAsText()
        )
    }

    @Test
    fun testCreateLotSuccess() = apiTestApplication {
        val response = client.post("/lots") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "name": "Apple Pen",
                        "preview": "~/img/lot/pen.jpeg"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.Created, response.status)
        assertEquals(
            """
                {
                    "lots": [
                        {
                            "id": 1,
                            "name": "Pan",
                            "preview": "~/img/lot/pan.jpeg"
                        },
                        {
                            "id": 2,
                            "name": "Apple Pen",
                            "preview": "~/img/lot/pen.jpeg"
                        }
                    ]
                }
            """.trimIndent(), response.bodyAsText()
        )
    }

    @Test
    fun testUpdateLotSuccess() = apiTestApplication {
        val response = client.patch("/lots/1") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                    {
                        "name": "Apple Pan",
                        "preview": "~/img/lot/pen.jpeg"
                    }
                """.trimIndent()
            )
        }
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """
                {
                    "lots": [
                        {
                            "id": 1,
                            "name": "Apple Pen",
                            "preview": "~/img/lot/pen.jpeg"
                        }
                    ]
                }
            """.trimIndent(), response.bodyAsText()
        )
    }

    @Test
    fun testDeleteLotSuccess() = apiTestApplication {
        val response = client.delete("/lots/1")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """
                {
                    "lots": []
                }
            """.trimIndent(), response.bodyAsText()
        )
    }
}
