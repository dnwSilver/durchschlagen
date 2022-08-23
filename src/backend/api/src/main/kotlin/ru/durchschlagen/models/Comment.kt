package ru.durchschlagen.models

import kotlinx.serialization.Serializable

@Serializable
data class Comment(
    val id: Int,
    val owner_id: Int,
    val auction_id: Int,
    val message: String?,
    val date: String?
)

var commentLastId = 1
val commentStorage = mutableListOf(
    Comment(
        id = 1,
        owner_id = 2,
        auction_id = 1,
        message = "Do you have documents for bread?",
        date = "2022.02.08 12:11"
    ),
)
