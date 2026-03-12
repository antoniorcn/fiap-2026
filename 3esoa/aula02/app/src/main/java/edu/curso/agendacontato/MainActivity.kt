package edu.curso.agendacontato

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.Button
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import edu.curso.agendacontato.ui.theme.AgendaContatoTheme


// var nome : String = ""


class MainActivity : ComponentActivity() {

    private val contatoViewModel : ContatoViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()



        setContent {
//            val contatoViewModel : ContatoViewModel by remember { viewModels() }
            LaunchedEffect(Unit) {
                contatoViewModel.lerBackend()
            }
            AgendaContatoTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    ContatoFormulario( modifier = Modifier.padding(innerPadding),
                        gravar = {nome, telefone, email, descricao ->
                            contatoViewModel.onGravar( nome, telefone, email, descricao ) },
                        pesquisar = { nome -> contatoViewModel.onPesquisar( nome ) })
                }
            }
        }
    }
}

@Composable
fun ContatoFormulario( modifier : Modifier = Modifier,
                       gravar : ( String, String, String, String ) -> Unit,
                       pesquisar : (String) -> Contato? ) {
    var nome by remember { mutableStateOf("") }
    var telefone by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var descricao by remember { mutableStateOf("") }

    Column( modifier = modifier ) {
        Text("Agenda de Contatos", modifier = Modifier
            .background(Color.Cyan)
            .padding( 20.dp)
            .align(Alignment.CenterHorizontally), fontSize = 32.sp)
        Text("Nome Completo: ")
        TextField(value = nome, onValueChange = { nome = it })
        Text("Telefone: ")
        TextField(value = telefone, onValueChange = { telefone = it })
        Text("Email: ")
        TextField(value = email, onValueChange = { email = it })
        Text("Descricao: ")
        TextField(value = descricao, onValueChange = { descricao = it })

        Row() {
            Button( onClick = {
                gravar( nome, telefone, email, descricao )
                nome= ""
                telefone = ""
                email = ""
                descricao = ""
            }) {
                Text("Gravar")
            }

            Button( onClick = {
                val contato = pesquisar( nome )
                if (contato != null) {
                    nome = contato.nome
                    telefone = contato.telefone
                    email = contato.email
                    descricao = contato.descricao
                }
            }) {
                Text("Pesquisar")
            }
        }
    }
}
