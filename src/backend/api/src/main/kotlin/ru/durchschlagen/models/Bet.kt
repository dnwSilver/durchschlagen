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
