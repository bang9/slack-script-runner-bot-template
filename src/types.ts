export type RuntimeVM = "node" | "python";

export interface RunnerRequest {
  vm: RuntimeVM;
  script: string;
}

export interface SlackRequest {
  type: "message_action";
  token: string;
  team: { id: string; domain: string };
  user: { id: string; username: string; team_id: string; name: string };
  channel: { id: string; name: string };
  message_ts: string;
  message: {
    text: string;
    type: "message";
    ts: string;
    team: string;
    client_msg_id: string;
  };
  response_url: string;
}
