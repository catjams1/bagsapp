export interface iUserData {
  response: Response;
  success: boolean;
}
interface Response {
  invited_by?: any;
  invited_memberships: number;
  membership: Membership;
  membershipPurchaseWallet: string;
  picture: string;
  points: number;
  pref_name: string;
  primaryWallet: string;
  profile_views: number;
  rank: number;
  referral_count: number;
  registered_at: string;
  status: string;
  ticker: string;
  twitter_data: Twitterdata;
  twitter_userID: string;
  type: string;
  username: string;
  uuid: string;
}
interface Twitterdata {
  created_at: string;
  followers_count: number;
  following_count: number;
  url: string;
  verified: boolean;
}
interface Membership {
  count: number;
  currency: string;
  expires_at: string;
  membership_id: number;
  payment_method: string;
  premium_since: string;
  price: number;
  referred_by: string;
  tier: string;
}

