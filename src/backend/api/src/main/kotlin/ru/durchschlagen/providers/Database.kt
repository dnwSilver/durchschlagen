package ru.durchschlagen.providers

val database = org.jetbrains.exposed.sql.Database.connect(
    "jdbc:postgresql://193.108.114.36:5432/durchschlagen",
    driver = "org.postgresql.Driver",
    user = "public_user",
    password = "123456"
)
