package ru.durchschlagen

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals

class AuctionsEndpointTest {
    @Test
    fun testAuctionsSearchSuccess() = apiTestApplication {
        val response = client.get("/auctions")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """[{"id":1,"status":"ACTIVE","owner":"Jean Valjean","title":"Fresh bread","lot":{"name":"A piece of bread","preview":"~/img/32.jpeg"},"bets":[{"owner":"Javert Inspector","cost":1000,"date":"2022.02.08 12:10"},{"owner":"Gavroche Thénardier","cost":1100,"date":"2022.02.08 12:13"}],"comments":[{"owner":"Javert Inspector","message":"Do you have documents for bread?","date":"2022.02.08 12:11"}],"end":"2022.02.08 19:30","cost":1223},{"id":2,"status":"CLOSE","owner":"Javert Inspector","title":"Super frying pan for sale","lot":{"name":"Pan","preview":"~/img/lot/pan.jpeg"},"bets":[{"owner":"Gavroche Thénardier","cost":14000,"date":"2022.02.08 12:29"}],"comments":[],"end":"2022.02.08 12:30","cost":13300}]""",
            response.bodyAsText()
        )
    }

    @Test
    fun testAuctionsSearchSuccessSingle() = apiTestApplication {
        val response = client.get("/auctions?search=PAN")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """[{"id":2,"status":"CLOSE","owner":"Javert Inspector","title":"Super frying pan for sale","lot":{"name":"Pan","preview":"~/img/lot/pan.jpeg"},"bets":[{"owner":"Gavroche Thénardier","cost":14000,"date":"2022.02.08 12:29"}],"comments":[],"end":"2022.02.08 12:30","cost":13300}]""".trimIndent(),
            response.bodyAsText()
        )
    }

    @Test
    fun testAuctionsSearchSuccessEmpty() = apiTestApplication {
        val response = client.get("/auctions?search=APPLEPAN")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("""[]""", response.bodyAsText())
    }

    @Test
    fun testAuctionCreateSuccess() = apiTestApplication {
        val response = client.post("/auctions") {
            contentType(ContentType.Application.Json)
            setBody(
                """{"owner_id":1,"title":"Pair of silver candlesticks","lot_id":3,"end":"2022.02.08 12:30","cost":100}"""
            )
        }
        assertEquals(HttpStatusCode.Created, response.status)
    }

    @Test
    fun testAuctionReadSuccess() = apiTestApplication {
        val response = client.get("/auctions/1")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """{"id":1,"status":"ACTIVE","owner":"Jean Valjean","title":"Fresh bread","lot":{"name":"A piece of bread","preview":"~/img/32.jpeg"},"bets":[{"owner":"Javert Inspector","cost":1000,"date":"2022.02.08 12:10"},{"owner":"Gavroche Thénardier","cost":1100,"date":"2022.02.08 12:13"}],"comments":[{"owner":"Javert Inspector","message":"Do you have documents for bread?","date":"2022.02.08 12:11"}],"end":"2022.02.08 19:30","cost":1223}""",
            response.bodyAsText()
        )
    }

    @Test
    fun testAuctionReadNotFound() = apiTestApplication {
        val response = client.get("/auctions/4")
        assertEquals(HttpStatusCode.NotFound, response.status)

    }

    @Test
    fun testAuctionEditTitleSuccess() = apiTestApplication {
        val response = client.patch("/auctions/1") {
            contentType(ContentType.Application.Json)
            setBody("""{"title":"Fresh baked goods"}""")
        }

        assertEquals(HttpStatusCode.OK, response.status)

        val auction = client.get("/auctions/1")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            """{"id":1,"status":"ACTIVE","owner":"Jean Valjean","title":"Fresh baked goods","lot":{"name":"A piece of bread","preview":"~/img/32.jpeg"},"bets":[{"owner":"Javert Inspector","cost":1000,"date":"2022.02.08 12:10"},{"owner":"Gavroche Thénardier","cost":1100,"date":"2022.02.08 12:13"}],"comments":[{"owner":"Javert Inspector","message":"Do you have documents for bread?","date":"2022.02.08 12:11"}],"end":"2022.02.08 19:30","cost":1223}""",
            auction.bodyAsText()
        )
    }

    @Test
    fun testAuctionAddComment() = apiTestApplication {
        val response = client.post("/auctions/2/comment") {
            contentType(ContentType.Application.Json)
            setBody("""{"message":"This frying pan can protect from bullets?"}""")
        }

        assertEquals(HttpStatusCode.Created, response.status)

        val auction = client.get("/auctions/2")
        assertEquals(HttpStatusCode.OK, auction.status)
        assertEquals(
            """{"id":2,"status":"CLOSE","owner":"Javert Inspector","title":"Super frying pan for sale","lot":{"name":"Pan","preview":"~/img/lot/pan.jpeg"},"bets":[{"owner":"Gavroche Thénardier","cost":14000,"date":"2022.02.08 12:29"}],"comments":[{"owner":"Gavroche Thénardier","message":"This frying pan can protect from bullets?","date":"2022.02.08 12:11"}],"end":"2022.02.08 12:30","cost":13300}""",
            auction.bodyAsText()
        )
    }

    @Test
    fun testAuctionPlaceBet() = apiTestApplication {
        val response = client.post("/auctions/2/bet") {
            contentType(ContentType.Application.Json)
            setBody("""{"cost":15000}""")
        }

        assertEquals(HttpStatusCode.Created, response.status)

        val auction = client.get("/auctions/2")
        assertEquals(HttpStatusCode.OK, auction.status)
        assertEquals(
            """{"id":2,"status":"CLOSE","owner":"Javert Inspector","title":"Super frying pan for sale","lot":{"name":"Pan","preview":"~/img/lot/pan.jpeg"},"bets":[{"owner":"Gavroche Thénardier","cost":14000,"date":"2022.02.08 12:29"},{"owner":"Jean Valjean","cost":15000,"date":"2022.02.08 12:30"}],"comments":[],"end":"2022.02.08 12:30","cost":13300}""".trimIndent(),
            auction.bodyAsText()
        )
    }
}
