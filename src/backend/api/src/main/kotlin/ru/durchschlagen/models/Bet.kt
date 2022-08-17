package ru.durchschlagen.models

import kotlinx.serialization.Serializable

@Serializable
data class Bet(
    val id: Int,
    val cost: Int,
    val auction_id: Int,
    val owner_id: Int,
    val date: String?
)

val betStorage = mutableListOf(
    Bet(
        id = 1,
        owner_id = 2,
        auction_id = 1,
        cost = 1000,
        date = "2022.02.08 12:10"
    ),
    Bet(
        id = 2,
        owner_id = 3,
        auction_id = 1,
        cost = 1100,
        date = "2022.02.08 12:13"
    ),
    Bet(
        id = 3,
        owner_id = 3,
        auction_id = 2,
        cost = 14000,
        date = "2022.02.08 12:29"
    ),
)
