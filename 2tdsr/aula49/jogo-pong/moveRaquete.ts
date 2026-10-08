import { Entidades } from "./entidades";
import { Dimensions } from "react-native";

// const {width, height} = Dimensions.get("screen");
const height = 780;
const width = 380;

const moveRaquete = (entidades : Entidades) : Entidades => {

    const raquete = entidades.raquete;
    let [x, y] = raquete.position;
    let dir = raquete.direction;
    let novoX = x;
    if (dir != 0) {
        novoX = x + (raquete.speed * dir);
        dir = 0;
        // console.log(raquete);
    }

    if (x > width) { 
        x = width;
    }
    if (x < 0) { 
        x = 0;
    }
    raquete.position = [novoX, y];
    raquete.direction = dir;
    // console.log("Raquete Depois: ", raquete);

    return entidades;
} 

export {moveRaquete};