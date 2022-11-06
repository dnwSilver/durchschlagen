@file:Suppress("SqlDialectInspection", "SqlNoDataSourceInspection")

package ru.durchschlagen.providers

import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import ru.durchschlagen.models.Lot

fun readLotById(lotId: Int): Lot? {
    var lot: Lot? = null
    transaction(database) {
        addLogger(StdOutSqlLogger)

        exec("SELECT * FROM lots WHERE id=$lotId") { rs ->
            rs.next()
            lot = Lot(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                preview = rs.getString("preview"),
                userId = rs.getInt("user_id")
            )
        }
    }
    return lot
}

fun readLotsByUserId(userId: Int): List<Lot>? {
    val lots = mutableListOf<Lot>()

    transaction(database) {
        addLogger(StdOutSqlLogger)

        exec("SELECT * FROM lots WHERE user_id=$userId") { rs ->
            while (rs.next()) {
                lots.add(
                    Lot(
                        id = rs.getInt("id"),
                        name = rs.getString("name"),
                        preview = rs.getString("preview"),
                        userId = rs.getInt("user_id")
                    )
                )
            }
        }
    }
    return lots.ifEmpty { null }
}

fun createLot(lot: Lot) {
    transaction(database) {
        addLogger(StdOutSqlLogger)
        lot.let {
            exec(
                "INSERT INTO lots (name, preview, user_id) \n" +
                    "VALUES ('${it.name}','${it.preview}', '${it.userId}')"
            )
        }
    }
}