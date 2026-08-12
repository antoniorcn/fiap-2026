import dotenv from 'dotenv';
dotenv.config({ path: ".env"});

interface Config {
    PORT: number;
    JWT_SECRET: string;
}

const config : Config = {
    PORT: parseInt(process.env.PORT? process.env.PORT : "3000"),
    JWT_SECRET: process.env.SECRET? process.env.SECRET : ""
} 

export { config }
export type { Config }