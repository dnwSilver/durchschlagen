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
import ru.durchschlagen.models.auctionLastId
import ru.durchschlagen.models.auctionStorage
import ru.durchschlagen.models.betLastId
import ru.durchschlagen.models.betStorage
import ru.durchschlagen.models.commentLastId
import ru.durchschlagen.models.commentStorage
import ru.durchschlagen.models.lotStorage

fun Route.auctionRouting() {
    route("/auctions") {
        get {
            if (auctionStorage.isNotEmpty()) {
                val query = call.parameters["search"]
                val auctions = auctionStorage.filter { auction ->
                    if (auction.title != null && query != null) auction.title?.contains(
                        query, ignoreCase = true
                    ) == true
                    else true
                }.map { responseAuctionDTOBuilder(it) }
                call.respond(auctions)
            } else {
                call.respondText("No auction found", status = HttpStatusCode.OK)
            }
        }
        get("{id?}") {
            val id = call.parameters["id"] ?: return@get call.respond(HttpStatusCode.BadRequest)
            val auction =
                auctionStorage.find { it.id.toString() == id } ?: return@get call.respond(HttpStatusCode.NotFound)
            call.respond(
                HttpStatusCode.OK, responseAuctionDTOBuilder(auction)
            )
        }
        post {
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

            val newAuction = Auction(
                id = ++auctionLastId,
                status = AuctionStatus.ACTIVE,
                title = body.title,
                lot_id = body.lot_id,
                owner_id = body.owner_id,
                end = body.end,
                cost = body.cost
            )
            auctionStorage.add(newAuction)
            call.respond(newAuction)
            call.response.status(HttpStatusCode.Created)
        }
        patch("{id?}") {
            val id = call.parameters["id"] ?: return@patch call.respond(HttpStatusCode.BadRequest)
            val auction =
                auctionStorage.find { it.id.toString() == id } ?: return@patch call.respond(HttpStatusCode.NotFound)

            val body = call.receive<RequestAuctionDTO>()
            body.owner_id?.let { auction.owner_id = it }
            body.title?.let { auction.title = it }
            body.end?.let { auction.end = it }
            body.cost?.let { auction.cost = it }
            body.lot_id?.let { auction.lot_id = it }
            call.respond(auction)
            call.response.status(HttpStatusCode.OK)
        }
        post("{id}/bet") {
            val auctionId = call.parameters["id"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            auctionStorage.find { it.id.toString() == auctionId } ?: return@post call.respond(HttpStatusCode.NotFound)
            val body = call.receive<RequestBetDTO>()
            val betCost = body.cost ?: return@post call.respondText(
                "Missing bet cost", status = HttpStatusCode.BadRequest
            )
            val bet = Bet(
                id = ++betLastId,
                cost = betCost,
                owner_id = 1,
                auction_id = auctionId.toInt(),
                date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"))
            )
            betStorage.add(bet)
            call.response.status(HttpStatusCode.Created)
        }
        post("{id}/comment") {
            val auctionId = call.parameters["id"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            auctionStorage.find { it.id.toString() == auctionId } ?: return@post call.respond(HttpStatusCode.NotFound)
            val body = call.receive<RequestCommentDTO>()
            val message = body.message ?: return@post call.respondText(
                "Missing message", status = HttpStatusCode.BadRequest
            )
            val comment = Comment(
                id = ++commentLastId,
                message = message,
                owner_id = 1,
                auction_id = auctionId.toInt(),
                date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"))
            )
            commentStorage.add(comment)
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
        lot = lotStorage.find {
            it.id == auction.lot_id
        }.let {
            ResponseAuctionDTO.ResponseLotDTO(it?.name, it?.preview)
        },
        bets = betStorage.filter {
            it.auction_id == auction.id
        }.map { bet ->
            ResponseAuctionDTO.ResponseBetDTO(
                owner = getUserName(bet.owner_id), date = bet.date, cost = bet.cost
            )
        },
        comments = commentStorage.filter { comment ->
            comment.auction_id == auction.id
        }.map { comment ->
            ResponseAuctionDTO.ResponseCommentDTO(
                owner = getUserName(comment.owner_id), message = comment.message, date = comment.date
            )
        },
        cost = auction.cost,
        title = auction.title,
        end = auction.end,
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
