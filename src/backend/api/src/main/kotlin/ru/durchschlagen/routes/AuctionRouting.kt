package ru.durchschlagen.routes

import getUserName
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import kotlinx.serialization.Serializable
import ru.durchschlagen.models.Auction
import ru.durchschlagen.models.AuctionStatus
import ru.durchschlagen.models.Bet
import ru.durchschlagen.models.Comment
import ru.durchschlagen.providers.createAuction
import ru.durchschlagen.providers.createBet
import ru.durchschlagen.providers.createComment
import ru.durchschlagen.providers.readAuctions
import ru.durchschlagen.providers.readBets
import ru.durchschlagen.providers.readCommentsByAuctionId
import ru.durchschlagen.providers.readLotById

fun Route.auctionRouting() {
    route("/auctions") {

        get {
            logEndpointEntry(call)

            val query = call.parameters["search"]
            val auctions =
                readAuctions("", query)?.map { responseAuctionDTOBuilder(it) } ?: return@get call.respondText(
                    "No auction found",
                    status = HttpStatusCode.OK
                )

            call.respond(auctions)
        }
        get("{id?}") {
            logEndpointEntry(call)

            val id = call.parameters["id"] ?: return@get call.respond(HttpStatusCode.BadRequest)
            val auction =
                readAuctions(id)?.first() ?: return@get call.respond(HttpStatusCode.NotFound)
            call.respond(
                HttpStatusCode.OK, responseAuctionDTOBuilder(auction)
            )
        }
        post {
            logEndpointEntry(call)

            val body = call.receive<RequestAuctionDTO>()
            body.owner_id ?: return@post call.respondText(
                "Missing owner", status = HttpStatusCode.BadRequest
            )
            body.title ?: return@post call.respondText(
                "Missing title", status = HttpStatusCode.BadRequest
            )
            body.cost ?: return@post call.respondText(
                "Missing cost", status = HttpStatusCode.BadRequest
            )
            body.end ?: return@post call.respondText(
                "Missing end", status = HttpStatusCode.BadRequest
            )
            body.lot_id ?: return@post call.respondText(
                "Missing lot_id", status = HttpStatusCode.BadRequest
            )

            createAuction(
                Auction(
                    id = 0,
                    status = AuctionStatus.ACTIVE,
                    title = body.title,
                    lot_id = body.lot_id,
                    owner_id = body.owner_id,
                    finish = body.end,
                    cost = body.cost
                )
            )

            call.response.status(HttpStatusCode.Created)
        }
        patch("{id?}") {
            logEndpointEntry(call)

            val id = call.parameters["id"] ?: return@patch call.respond(HttpStatusCode.BadRequest)
            val auction = readAuctions(id)?.first() ?: return@patch call.respond(HttpStatusCode.NotFound)

            val body = call.receive<RequestAuctionDTO>()
            body.owner_id?.let { auction.owner_id = it }
            body.title?.let { auction.title = it }
            body.end?.let { auction.finish = it }
            body.cost?.let { auction.cost = it }
            body.lot_id?.let { auction.lot_id = it }
            call.respond(auction)
            call.response.status(HttpStatusCode.OK)
        }
        post("{id}/bet") {
            logEndpointEntry(call)

            val auctionId = call.parameters["id"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            readAuctions(auctionId) ?: return@post call.respond(HttpStatusCode.NotFound)
            val body = call.receive<RequestBetDTO>()
            val betCost = body.cost ?: return@post call.respondText(
                "Missing bet cost", status = HttpStatusCode.BadRequest
            )
            createBet(
                Bet(
                    id = 0,
                    cost = betCost,
                    owner_id = 1,
                    auction_id = auctionId.toInt(),
                    date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"))
                )
            )
            call.response.status(HttpStatusCode.Created)
        }
        post("{id}/comment") {
            logEndpointEntry(call)

            val auctionId = call.parameters["id"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            readAuctions(auctionId) ?: return@post call.respond(HttpStatusCode.NotFound)
            val body = call.receive<RequestCommentDTO>()
            val message = body.message ?: return@post call.respondText(
                "Missing message", status = HttpStatusCode.BadRequest
            )
            createComment(
                Comment(
                    id = 0,
                    message = message,
                    owner_id = 1,
                    auction_id = auctionId.toInt(),
                    send = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
                )
            )
            call.response.status(HttpStatusCode.Created)
        }
    }
}

@Serializable
data class RequestBetDTO(
    val cost: Int? = null
)

@Serializable
data class RequestCommentDTO(
    val message: String? = null
)

@Serializable
data class RequestAuctionDTO(
    val owner_id: Int? = null,
    val title: String? = null,
    val lot_id: Int? = null,
    val cost: Int? = null,
    val end: String? = null
)

fun responseAuctionDTOBuilder(auction: Auction): ResponseAuctionDTO {
    return ResponseAuctionDTO(
        id = auction.id,
        status = auction.status,
        owner = getUserName(auction.owner_id),
        lot = readLotById(auction.lot_id).let {
            ResponseAuctionDTO.ResponseLotDTO(it?.name, it?.preview)
        },
        bets = readBets(auction.id).map { bet ->
            ResponseAuctionDTO.ResponseBetDTO(
                owner = getUserName(bet.owner_id), date = bet.date, cost = bet.cost
            )
        },
        comments = readCommentsByAuctionId(auction.id.toString()).map { comment ->
            ResponseAuctionDTO.ResponseCommentDTO(
                owner = getUserName(comment.owner_id), message = comment.message, date = comment.send
            )
        },
        cost = auction.cost,
        title = auction.title,
        end = auction.finish,
    )
}

@Serializable
data class ResponseAuctionDTO(
    val id: Int,
    var status: AuctionStatus?,
    var owner: String?,
    var title: String?,
    var lot: ResponseLotDTO,
    var bets: List<ResponseBetDTO>,
    var comments: List<ResponseCommentDTO>,
    var end: String?,
    var cost: Int,
) {
    @Serializable
    data class ResponseLotDTO(
        val name: String?, val preview: String?
    )

    @Serializable
    data class ResponseBetDTO(
        val owner: String?, val cost: Int, val date: String?
    )

    @Serializable
    data class ResponseCommentDTO(
        val owner: String?, val message: String?, val date: String?
    )
}
