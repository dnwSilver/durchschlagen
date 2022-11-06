package ru.durchschlagen.models

import kotlinx.serialization.Serializable

@Serializable
data class Comment(
    val id: Int,
    val owner_id: Int,
    val auction_id: Int,
    val message: String?,
    val send: String?
)
