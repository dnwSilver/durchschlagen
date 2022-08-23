package ru.durchschlagen.models

import kotlinx.serialization.Serializable

@Serializable
data class Lot(
    val id: Int,
    var name: String?,
    var preview: String?,
    var userId: Int?,
)

var lotLastId = 2

val lotStorage = mutableListOf(
    Lot(id = 1, name = "Pan", preview = "~/img/lot/pan.jpeg", userId = 1),
    Lot(id = 2, name = "A piece of bread", preview = "~/img/32.jpeg", userId = 1)
)
