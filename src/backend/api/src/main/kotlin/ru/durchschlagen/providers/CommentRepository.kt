@file:Suppress("SqlDialectInspection", "SqlNoDataSourceInspection")

package ru.durchschlagen.providers

import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import ru.durchschlagen.models.Comment

fun readCommentsByAuctionId(auctionId: String): List<Comment> {
    val comments = mutableListOf<Comment>()
    transaction(database) {
        addLogger(StdOutSqlLogger)
        exec("SELECT * FROM comments WHERE auction_id=$auctionId") { rs ->
            while (rs.next()) {
                comments.add(
                    Comment(
                        id = rs.getInt("id"),
                        message = rs.getString("message"),
                        owner_id = rs.getInt("owner_id"),
                        auction_id = rs.getInt("auction_id"),
                        send = rs.getString("send")
                    ),
                )
            }
        }
    }

    return comments
}

fun createComment(comment: Comment) {

    transaction(database) {
        addLogger(StdOutSqlLogger)
        with(comment) {
            exec(
                "INSERT INTO comments (message, owner_id, auction_id, send) " +
                    "VALUES ('$message', '$owner_id', $auction_id, '$send')"
            )
        }
    }
}
