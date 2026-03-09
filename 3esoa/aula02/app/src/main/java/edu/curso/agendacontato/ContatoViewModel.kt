package edu.curso.agendacontato

import android.R.attr.level
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.android.Android
import io.ktor.client.plugins.HttpSend.Plugin.install
import io.ktor.client.plugins.api.SetupRequest.install
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

const val APP_LOG_NAME = "AGENDA_CONTATO"

class CustomHttpLogger : Logger  {
    override fun log(message: String) {
        Log.i(APP_LOG_NAME, message)
    }
}

class ContatoViewModel : ViewModel() {

    private val URL_BASE = "https://esoa-b78fb-default-rtdb.firebaseio.com"

    private val lista = mutableListOf<Contato>()

    private val httpClient = HttpClient(Android) {

        install(ContentNegotiation ) {
            json(  Json {
                coerceInputValues = true
                ignoreUnknownKeys = true
                prettyPrint = true
                isLenient = true
            })
        }

        install(Logging) {
            logger = CustomHttpLogger()
            level = LogLevel.ALL
        }
    }

    init {
        viewModelScope.launch {
            lerBackend()
        }
    }

    suspend fun gravarBackend( contato : Contato ) {
        Log.i(APP_LOG_NAME, "gravarBackend()")
        httpClient.post("$URL_BASE/contato.json") {
            setBody(contato)
            contentType(ContentType.Application.Json)
        }
        Log.i(APP_LOG_NAME, "gravarBackend() - Contato gravado")
    }

    suspend fun lerBackend() {
        Log.i(APP_LOG_NAME, "lerBackend()")
        val objetos : Map<String, Contato> = httpClient.get("$URL_BASE/contato.json").body()
        lista.clear()
        for (chave in objetos.keys) {
            val contato = objetos[chave]
            if (contato != null) {
                val novoContato = contato.copy(id = chave)
                lista.add(novoContato)
            }
        }
        Log.i(APP_LOG_NAME, "lerBackend() - lista atualizada")
    }

    fun onGravar( nome : String, telefone : String, email : String, descricao : String ) {
        val contato = Contato(id = null, nome, telefone, email, descricao)
        viewModelScope.launch {
            // lista.add( contato )
            gravarBackend(contato)
            lerBackend()
        }
    }

    fun onPesquisar( nome : String ) : Contato? {
        for (contato in lista) {
            if (contato.nome.contains(nome)) {
                return contato
            }
        }
        return null
    }

}