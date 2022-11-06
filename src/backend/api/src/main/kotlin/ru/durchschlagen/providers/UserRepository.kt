@file:Suppress("SqlDialectInspection", "SqlNoDataSourceInspection")

package ru.durchschlagen.providers

import User
import UserRoleType
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction

val cache = HashMap<String, User>()

fun readUser(id: String?, login: String? = null, password: String? = null): User? {
    var user: User? = null

    if (id != null && cache[id] != null) {
        return cache[id]
    }

    transaction(database) {
        addLogger(StdOutSqlLogger)
        val idExpression = if (id == null) "" else " AND id=$id"
        val passwordExpression = if (password == null) "" else " AND password='$password'"
        val loginExpression = if (login == null) "" else " AND login='$login'"

        exec("SELECT * FROM users WHERE 1=1 $idExpression$passwordExpression$loginExpression") { rs ->
            rs.next()
            user = User(
                id = rs.getInt("id"),
                login = rs.getString("login"),
                email = rs.getString("email"),
                firstName = rs.getString("first_name"),
                role = UserRoleType.CUSTOMER,
                lastName = rs.getString("last_name"),
                password = rs.getString("password")
            )
            if (id != null) cache[id] = user!!
        }
    }


    return user
}

fun createUser(user: User) {
    transaction(database) {
        addLogger(StdOutSqlLogger)

        exec(
            "INSERT INTO users (login, password, first_name, last_name, email)\n" +
                "VALUES ('${user.login}','${user.password}','${user.firstName}','${user.lastName}','${user.email}')"
        )
    }
}