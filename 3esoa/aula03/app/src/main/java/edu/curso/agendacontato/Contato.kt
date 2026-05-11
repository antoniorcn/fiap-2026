package edu.curso.agendacontato

import android.annotation.SuppressLint
import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

@SuppressLint("UnsafeOptInUsageError")
@Serializable
@Entity(tableName = "contato")
data class Contato (
    @PrimaryKey(autoGenerate = true)
    val idSql : Long = 0,
    val id : String? = null,
    val nome: String,
    val telefone: String,
    val email: String,
    val descricao: String
)