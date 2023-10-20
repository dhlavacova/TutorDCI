import dotenv from "dotenv";
import axios from "axios";
export const slackTutorCommunity = async (req, res) => {

    try {
      /*  if (!req.user) {
            return res.status(400).json({ message: "Chyba autentikace." });
        }
        else{*/
       /* const message = req.body.message; */// Extract 'message' from the POST request body
const message= req.body.message;
console.log(message);
        if (!message) {
            return res
                .status(400)
                .send("Message field is missing in the request body");
        }

        await axios.post(process.env.SLACK, {
            text: message, // Use the extracted 'message' value
        });

        res.send("Message sent to Slack successfully");
    }/*} */catch (error) {
        res.send("Failed to send message to Slack"+error.message)
    }
};

export const slackToOnePerson = async (req, res, next) => {
    const token = process.env.TOKEN_SLACK_TUTOR2;
    const message = ` :wave: Hi, in 15 Minuten beginnt dein Tutorium. Wir freuen uns auf dich!`;
  /*  const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=utf-8",
    };*/

    try {
        const response = await axios.get("https://slack.com/api/users.list", {
            headers: headers,
        });
        if (response.status === 200) {
            const users = response.data.members || [];
            console.log(users);
            /*const myUser = users.find((user) => user.realname === "Danka");*/
           /* console.log(myUser);*/
            const userList = users.map((user) => ({
                id: user.id,
                name: user.name,
                profile: user.profile,
            }));
            const myUser = userList.find((user) => user.profile.find((profile) =>profile.display_name === "Danka"||profile.display_name ==="Dana Hlavacova"));
            if (!myUser) {
                return res.status(404).send("User not found in Slack");
            }
            const data = { channel: myUser.id, text: message };
            console.log(myUser.name);
            try {
                const response = await axios.post(
                    "https://slack.com/api/chat.postMessage",
                    data,
                    { headers: headers },
                );

                if (response.status === 200) {
                    res.json(response.data);
                    console.log(myUser.name);
                } else {
                    res.status(response.status).json({ error: response.statusText });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    } catch (error) {
        res.send("Failed to send message to Slack"+error.message);
    }
}
