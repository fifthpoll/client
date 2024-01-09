import { Event, VotingType } from "../../types";

const dummyEvent: Event = {
  expires: Date.now() + 3600000,
  type: VotingType.Singular,
  createdAt: Date.now() - 10000,
  currentWinningOutcome: { uid: "VIP", votes: 5 },
  metadata: {
    uid: "UNSB",
    name: "Voting for community symbol",
    description:
      "Community Symbol must be decided and we conduct this event to do that.",
  },
  canRecast: true,
  votes: {
    vip: {
      title: "We can set our previous picture as community symbol",
      votes: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "did:ion:EiAWeuGez4AEr26XQCVE9ZaZ1_M_iIqO1XYOpANVGm__9g:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiYjVuenM4ZmIxaXdxMkNqSnJqUnV0MkctZXRRTVlhZVJnX2RzVFdlUmlFTSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiIxZ000UEFvc3M0dDdZeS1FcHhqSXlIbFd2TklTc1hBZ1lNOTJKeENpaHNjIiwieSI6Im9lblpYWUZPRG5vZmw1RHpzeFRHNHNSY3c4U1NnQk13WmpzdFIzVmNpd0UifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDd3ZZWG9jc0k1NGg5WlJrQmNJTFpOb0p3T09jTFhQNF9CLWRYdlpQZkJnZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQmo0elZIcDlIUmNXUThrT1lzdkpPREFIUmRzaGRyeFJFX2pfSDZnYzRVWHciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUR1ajYwVkZMMThTbWwyZm03bE92djQ1aEFUMGFtVUhzNXhITFZEVGZEOWZRIn19",
      ],
    },
    holt: {
      title:
        "We will have our residence places as a collage and put it as our symbol",
      votes: ["", "", ""],
    },
    fest: {
      title:
        "We can have our last festival pictures in a collage as our symbol",
      votes: ["", "", "", "", ""],
    },
    bug: {
      title: "We can have the computer code as our community symbol",
      votes: [""],
    },
  },
};

export default dummyEvent;
