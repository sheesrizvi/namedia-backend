var admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

var serviceAccount = require("../namedia-app-firebase-adminsdk-wlndo-9f68aca2ee.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post("/send-notification", async (req, res) => {
  const { token, title, body, image, id } = req.body;
  let user = [];
  user.push(id);

  const registrationToken = token;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    android: {
      notification: {
        imageUrl: image,
      },
    },
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
        },
      },
      fcm_options: {
        image: image,
      },
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.

      console.log("Successfully sent message:", response);
      res.json("success");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
});

module.exports = router;
