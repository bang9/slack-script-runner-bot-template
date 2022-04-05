import express from "express";
import { VM } from "vm2";
import { SlackRequest } from "./types";
import { parseCode, replyMessage } from "./utils";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/status", (req, res) => res.sendStatus(200));
app.post("/run", async (req, res) => {
  try {
    if (!req.body) res.sendStatus(404);
    const slackReq = JSON.parse(req.body.payload) as SlackRequest;
    const codeGroups = parseCode([], slackReq.message.text);

    const vm = new VM();
    const results = codeGroups.map((code) => {
      return vm.run(`
          function runner() { ${code}; }
          runner();
      `);
    });

    await replyMessage(results, slackReq.channel.id, slackReq.message_ts);
    console.log("success", results);
    res.json({ success: true, results });
  } catch (e) {
    console.log("error", e);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 80, () => console.log("start server"));
