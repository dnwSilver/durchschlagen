@file:Suppress("SqlDialectInspection", "SqlNoDataSourceInspection")

package ru.durchschlagen.providers

import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import ru.durchschlagen.models.Auction
import ru.durchschlagen.models.AuctionStatus

fun readAuctions(id: String = "", query: String? = ""): MutableList<Auction>? {
    val auctions = mutableListOf<Auction>()
    transaction(database) {
        addLogger(StdOutSqlLogger)
        val idExpression = if (id == "") "" else " AND id=$id"
        val queryExpression = if (query == null) "" else " AND title LIKE '%$query%'"

        exec("SELECT * FROM auctions WHERE 1=1$idExpression$queryExpression") { rs ->
            while (rs.next()) {
                auctions.add(
                    Auction(
                        id = rs.getInt("id"),
                        status = AuctionStatus.valueOf(rs.getString("status")),
                        title = rs.getString("title"),
                        lot_id = rs.getInt("lot_id"),
                        owner_id = rs.getInt("owner_id"),
                        finish = rs.getString("finish"),
                        cost = rs.getInt("cost")
                    ),
                )
            }
        }
    }

    return auctions.ifEmpty { null }
}

fun createAuction(auction: Auction) {
    transaction(database) {
        addLogger(StdOutSqlLogger)
        with(auction) {
            exec(
                "INSERT INTO auctions (status, title, lot_id, owner_id, finish, cost) " +
                    "VALUES ('$status', '$title', $lot_id, $owner_id, '$finish', $cost)"
            )
        }
    }
}