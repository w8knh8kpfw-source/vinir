const express = require("express");
const path = require("path");

const app = express();
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://vinir.onrender.com"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "index.html")
    );
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
            return res.status(500).json({
                success: false,
                message: "Telegram не настроен"
            });
        }

        const message = `
🦷 НОВАЯ ЗАЯВКА НА ПРИЁМ

👤 Имя:
${name}

📞 Телефон:
${phone}

🩺 Направление:
${service || "Не указано"}

💬 Что беспокоит:
${complaint || "Не указано"}
        `;

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
                "Telegram error:",
                result
            );

            return res.status(500).json({
                success: false,
                message: "Ошибка отправки в Telegram"
            });

        }


        res.json({
            success: true
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});
