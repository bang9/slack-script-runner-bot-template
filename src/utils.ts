import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";

dotenv.config();
const slack = new WebClient(process.env.SLACK_TOKEN);

export function parseCode(codeGroups: string[], text: string): string[] {
  const slicer = "```";
  const starts = text.indexOf(slicer);
  if (starts === -1) return codeGroups;

  const sliced = text.slice(starts + slicer.length);
  const ends = sliced.indexOf(slicer);
  const code = sliced.slice(0, ends);
  codeGroups.push(code);

  return parseCode(codeGroups, sliced.slice(ends + slicer.length));
}

export async function replyMessage(results: any[], id: string, ts: string) {
  try {
    await slack.conversations.join({ channel: id });
  } catch {}

  await slack.chat.postMessage({
    channel: id,
    thread_ts: ts,
    blocks: results.map((r) => ({
      type: "section",
      text: { type: "mrkdwn", text: "```" + r + "```" },
    })),
  });
}
