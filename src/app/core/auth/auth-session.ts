export interface AuthSession {
  username: string;
  name: string;
  roles: readonly string[];
}
