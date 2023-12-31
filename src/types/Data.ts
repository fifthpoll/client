export enum VotingType {
  Singular = "Singular",
  Weighted = "Weighted",
  Quadratic = "Quadratic",
  Plurality = "Plurality",
  Plural = "Plural",
}

interface EventBase {
  id: string;
  metadata: {
    name: string;
    description?: string;
    images?: string[];
    uid: string;
  };
  createdAt: number;
  expires: number;
}

export type Event = EventBase &
  (
    | {
        type: VotingType.Singular;
        votes: Record<string, { title: string; votes: string[] }>;
        currentWinningOutcome: { uid: string; votes: number };
        voters?: { count: number } | { ids: string[] };
        canRecast?: boolean;
      }
    | {
        type: VotingType.Weighted;
        votes: Record<string, { title: string; votes: string[] }>;
        currentWinningOutcome: { uid: string; votes: number };
        voters?: { count: number } | { ids: string[] };
        canRecast?: boolean;
      }
  );
