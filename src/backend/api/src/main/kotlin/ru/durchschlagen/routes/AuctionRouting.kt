package ru.durchschlagen.routes

import getUserName
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import ru.durchschlagen.models.auctionStorage
import ru.durchschlagen.models.betStorage
import ru.durchschlagen.models.commentStorage
import ru.durchschlagen.models.lotStorage

fun Route.auctionRouting() {
    route("/auctions") {
        get {
            if (auctionStorage.isNotEmpty()) {
                val auctions = auctionStorage.map { auction ->
                    ResponseAuctionDTO(
                        id = auction.id,
                        status = auction.status,
                        owner = getUserName(auction.owner_id),
                        lot = lotStorage
                            .find {
                                it.id == auction.lot_id
                            }.let {
                                ResponseAuctionDTO.ResponseLotDTO(it?.name, it?.preview)
                            },
                        bets = betStorage
                            .filter {
                                it.auction_id == auction.id
                            }.map { bet ->
                                ResponseAuctionDTO.ResponseBetDTO(
                                    owner = getUserName(bet.owner_id),
                                    date = bet.date,
                                    cost = bet.cost
                                )
                            },
                        comments = commentStorage.filter { comment ->
                            comment.auction_id == auction.id
                        }.map { comment ->
                            ResponseAuctionDTO.ResponseCommentDTO(
                                owner = getUserName(comment.owner_id),
                                message = comment.message,
                                date = comment.date
                            )
                        },
                        cost = auction.cost,
                        title = auction.title,
                        end = auction.end,
                    )
                }
                call.respond(auctions)
            } else {
                call.respondText("No auction found", status = HttpStatusCode.OK)
            }
        }
    }
}

@Serializable
data class ResponseAuctionDTO(
    val id: Int,
    var status: String?,
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
        val name: String?,
        val preview: String?
    )

    @Serializable
    data class ResponseBetDTO(
        val owner: String?,
        val cost: Int,
        val date: String?
    )

    @Serializable
    data class ResponseCommentDTO(
        val owner: String?,
        val message: String?,
        val date: String?
    )
}
