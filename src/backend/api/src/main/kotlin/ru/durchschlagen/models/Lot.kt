package ru.durchschlagen.models

import kotlinx.serialization.Serializable

@Serializable
data class Lot(
    val id: Int,
    var name: String?,
    var preview: String?,
)

val lotStorage = mutableListOf(
    Lot(1, "Pan", "~/img/lot/pan.jpeg"),
    Lot(2, "A piece of bread", "~/img/32.jpeg")
)
