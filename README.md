# slack-script-runner

슬랙에서 JS 코드를 실행하기 위한 봇의 템플릿입니다.


# 봇에 필요한 기능
- Features/Interactivity & Shortcuts/Shortcuts 에서 아래의 작업 수행
  - Shortcuts 를 `On message` 타입으로 생성
  - Interactivity/Request url 에 `https://your-server-url.com/run` 경로 추가
- Features/OAuth & Permissions/Scopes 에서 아래의 권한 추가
  - channels:join
  - chat:write
  - commands

# 환경변수
- SLACK_TOKEN: `xoxb`로 시작하는 봇의 토큰, Features/OAuth 에서 확인가능
- PORT: 봇 앱이 실행될 포트번호

# 슬랙에서 실행 방법
- 메세지에 `
```markdown```
` 형태로 코드를 작성합니다.
- 코드의 마지막줄에 `return` 으로 반환해야 하고, 넘버/스트링/불리언 등의 값만 표현 가능합니다. (객체를 반환하고 싶다면 JSON.stringify 를 사용하세요)
- 코드는 여러 구문 입력이 가능합니다.
- 작성된 메세지의 추가작업을 Shortcuts 를 이용해서 메세지에 작성된 코드를 실행합니다.
- 실행된 코드의 반환값이 메세지의 쓰레드로 달립니다.
