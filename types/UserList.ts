export interface iUserList {
    success: boolean;
    response: iUserListResponse[];
}
export interface iUserListResponse {
    _id: string;
    username: string;
    picture: string;
    twitter_userID: string;
    invites: number;
    twitter_data: Twitterdata;
    type?: string;
    ticker?: string;
    preorder?: Preorder;
    membership: Membership;
    referral_count?: number;
    invited_memberships?: number;
    points: number;
    rank?: number;
}
interface Membership {
    tier: string;
    premium_since?: string;
    expires_at?: string;
    payment_method?: string;
    price?: number;
    currency?: string;
    referred_by?: string;
    membership_id?: number;
    count?: number;
}
interface Preorder {
    claimed?: boolean;
    claimed_at?: string;
    invited_by?: string;
    users_invited?: number;
    claimed_android?: boolean;
    claimed_at_android?: string;
    invited_by_android?: string;
}
interface Twitterdata {
    verified: boolean;
    followers_count: number;
    following_count: number;
    created_at: string;
    url?: string;
}