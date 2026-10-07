import { Entidades } from "./ballEntity";
import { Dimensions } from "react-native";

// const {width, height} = Dimensions.get("screen");
const height = 780;
const width = 380;

const moveBall = (entidades : Entidades) : Entidades => {

    const ball = entidades.ball;
    const [x, y] = ball.position;
    let [dirX, dirY] = ball.direction;
    if (y > height) { 
        dirY = -1;
    }
    if (y < 0) { 
        dirY = 1;
    }
    ball.direction = [dirX, dirY];
    ball.position = [x + (ball.speed * dirX), y + (ball.speed * dirY)];

    return entidades;
}

export {moveBall};