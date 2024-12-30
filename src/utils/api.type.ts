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
