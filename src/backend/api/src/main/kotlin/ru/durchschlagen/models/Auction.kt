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
    var finish: String?,
    var cost: Int,
)
