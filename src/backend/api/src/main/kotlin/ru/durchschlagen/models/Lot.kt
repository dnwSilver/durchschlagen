package ru.durchschlagen.models

import kotlinx.serialization.Serializable

@Serializable
data class Lot(
    val id: Int,
    var name: String?,
    var preview: String?,
    var userId: Int?,
)
