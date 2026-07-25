const express = require("express");

const app = express();

const PORT = process.env.PORT || 10000;

const ALLOWED_ORIGIN = "https://vinir.onrender.com";

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        ALLOWED_ORIGIN
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("ВИНИР API работает");
});

app.post("/api/appointment", async (req, res) => {

    try {

        const {
            name,
            phone,
            service,
            complaint
        } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Заполните имя и телефон"
            });
        }

        const botToken =
            process.env.TELEGRAM_BOT_TOKEN;

        const chatId =
            process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error(
                "Не найдены TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID"
            );

            return res.status(500).json({
                success: false,
                message: "Telegram не настроен на сервере"
            });
        }

        const message =
`🦷 НОВАЯ ЗАЯВКА НА ПРИЁМ

👤 Имя:
${name}

📞 Телефон:
${phone}

🩺 Направление:
${service || "Не указано"}

💬 Что беспокоит:
${complaint || "Не указано"}`;

        const telegramResponse =
            await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message
                    })
                }
            );

        const result =
            await telegramResponse.json();

        if (!result.ok) {

            console.error(
                "Telegram API error:",
                result
            );

            return res.status(500).json({
                success: false,
                message: "Telegram не принял сообщение"
            });

        }

        res.json({
            success: true,
            message: "Заявка отправлена"
        });

    } catch (error) {

        console.error(
            "SERVER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });

    }

});

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `ВИНИР API запущен на порту ${PORT}`
    );

});
