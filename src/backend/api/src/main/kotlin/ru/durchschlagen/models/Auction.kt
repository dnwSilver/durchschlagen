package ru.durchschlagen.models

import kotlinx.serialization.Serializable

enum class AuctionStatus {
    ACTIVE,
    CLOSE
}

@Serializable
data class Auction(
    val id: Int,
    var status: AuctionStatus?,
    var title: String?,
    var lot_id: Int,
    var owner_id: Int,
    var end: String?,
    var cost: Int,
)

var auctionLastId = 2
val auctionStorage = mutableListOf(
    Auction(
        id = 1,
        status = AuctionStatus.ACTIVE,
        title = "Fresh bread",
        lot_id = 2,
        owner_id = 1,
        end = "2023.02.08 19:30",
        cost = 1223
    ),
    Auction(
        id = 2,
        status = AuctionStatus.CLOSE,
        title = "Super frying pan for sale",
        lot_id = 1,
        owner_id = 2,
        end = "2022.02.08 12:30",
        cost = 13300
    ),
)
