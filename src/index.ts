import {Elysia} from "elysia";
import {rateLimit} from "elysia-rate-limit";

const url =
    "https://script.google.com/macros/s/AKfycbwHGQjf1vlKbY7UJ3h1OUTywJCgma6SlJi94WXaFBhS_93cdfHhIB0mVQBHqHRtbO4dQQ/exec";


const app = new Elysia()
    .use(rateLimit({
        max: 2
    }))

    .post("/", async ({body}) => {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"},
        })


        return await response.json()
    })

    .listen(process.env.PORT ?? 4444);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
