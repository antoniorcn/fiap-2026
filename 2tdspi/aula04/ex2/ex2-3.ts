const umidade : number = 20

if (umidade < 30) { 
    console.log("O ar está muito seco");
//      redundante    
// } else (umidade >= 30 && umidade < 60) { 
    
} else if (umidade < 60) { 
    console.log("O ar está seco");
} else { 
    console.log("O ar está úmido");
}

