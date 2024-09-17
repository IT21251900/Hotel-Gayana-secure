const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "911259510627-hpck0jrs9j8qv2ip416duu8n93sqk7em.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,  
            clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});