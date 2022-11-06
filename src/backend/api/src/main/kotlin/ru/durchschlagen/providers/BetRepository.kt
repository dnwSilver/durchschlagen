@file:Suppress("SqlDialectInspection", "SqlNoDataSourceInspection")

package ru.durchschlagen.providers

import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import ru.durchschlagen.models.Bet

fun readBets(auctionId: Int): List<Bet> {
    val bets = mutableListOf<Bet>()
    transaction(database) {
        addLogger(StdOutSqlLogger)

        exec("SELECT * FROM bets WHERE auction_id=$auctionId") { rs ->
            while (rs.next()) {
                bets.add(
                    Bet(
                        id = rs.getInt("id"),
                        auction_id = rs.getInt("auction_id"),
                        owner_id = rs.getInt("owner_id"),
                        date = rs.getString("date"),
                        cost = rs.getInt("cost")
                    )
                )
            }
        }
    }
    return bets
}

fun createBet(bet: Bet) {
    transaction {
        addLogger(StdOutSqlLogger)

        with(bet) {
            exec(
                "INSERT INTO bets (auction_id, owner_id, cost, date) \n"
                    + " VALUES ($auction_id, $owner_id, $cost, '$date' )"
            )
        }
    }
}