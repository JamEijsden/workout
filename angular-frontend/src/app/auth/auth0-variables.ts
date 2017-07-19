interface AuthConfig {
  audience: string;
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  audience: 'https://jameijsden.eu.auth0.com/api/v2/',
  clientID: 'LvMUFjGd3a3UzkWpcDE__JM0rZSTsa83',
  domain: 'jameijsden.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
