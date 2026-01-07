export type UserSummaryData = {
	username: string;
	tag: string;
	profilePictureUrl: string;
	elo: number;
	country: string;
};
export type UserDetailedData = {
	username: string;
	tag: string;
	profilePictureUrl: string;
	elo: number;
	country: string;
	bio: string;
};

export type RelationshipStatus = "pending" | "accepted";

export type GetAllFriendsResult = {
	username: string;
	tag: string;
	country: string;
	profilePictureUrl: string;
	elo: number;
	createdAt: string;
	relationshipStatus: RelationshipStatus;
}[];

export type Visibility = "private" | "public" | "friends";

export type GetAllModulesSummaryResult = {
	name: string;
	description: string;
	visibility: Visibility;
	createdAt: string;
	lastModified: string;
	active: boolean;
}[];

export type GetUsersSummaryResult = UserSummaryData[];
export type GetUsersDetailedResult = UserDetailedData[];

export type GetRelationshipResult = {
	relationship?: {
		createdAt: string;
		relationshipStatus: RelationshipStatus;
		fromUser1: boolean;
	};
};

export type FetchModuleResult = {
	name: string;
	description: string;
	code: string;
	visibility: Visibility;
	createdAt: string;
	lastModified: string;
};

export type PrepareCompilationResult = {
	encrypted_user_id: string;
};
export type CompilationResult = {
	hmac: string;
};
export type DuelType = "friendly" | "ranked" | "tournament";

export type DuelPlayerSummaryData = {
	elo: number;
	tag: string;
	username: string;
};

export type DuelSessionData = {
	p1: DuelPlayerSummaryData;
	p2: DuelPlayerSummaryData;
	duel_type: DuelType;
};
export type DuelSessionContext = {
	context: DuelSessionData;
	side: number;
};

export type DuelOutcome = "P1_WON" | "P2_WON" | "draw";
export type WinningMethod = "ego" | "neuron" | "forfeit" | "draw";

export type DuelResultData = {
	date: string;
	duelOutcome: DuelOutcome;
	duelType: DuelType;
	winningMethod: WinningMethod;
	p1EloDelta: number;
	p2EloDelta: number;
	duration: number;
	p1EgoCount: number;
	p1Energy: number;
	p1CorruptedData: number;
	p1EmotionalData: number;
	p1QuantumData: number;
	p1LogicalData: number;
	p2EgoCount: number;
	p2Energy: number;
	p2CorruptedData: number;
	p2EmotionalData: number;
	p2QuantumData: number;
	p2LogicalData: number;
	p1Username: string;
	p1Tag: string;
	p1ProfilePictureUrl?: string;
	p1Elo: number;
	p2Username: string;
	p2Tag: string;
	p2ProfilePictureUrl?: string;
	p2Elo: number;
	isP1: boolean;
};

export type DuelHistoryRow = {
	sessionId: string;
	p1Username: string;
	p2Username: string;
	p1Tag: string;
	p2Tag: string;
	p1Elo: number;
	p2Elo: number;
	duelOutcome: DuelOutcome;
	duelType: DuelType;
	date: string;
	isP1: boolean;
};

export type DuelHistoryResult = {
	duels: DuelHistoryRow[];
	hasMore: boolean;
	nextCursor: string;
};
