# LinkedIn API Setup Guide

To enable automatic posting to LinkedIn, you need to create a LinkedIn App and get the necessary credentials.

## 1. Create a LinkedIn App
1. Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps).
2. Click **Create App**.
3. Fill in the details:
   - **App Name**: Your App Name (e.g., "Waizcom Blog Auto-Poster")
   - **LinkedIn Page**: You need to associate it with a company page. If you don't have one, create one first.
   - **Privacy Policy URL**: Link to your privacy policy.
   - **App Logo**: Upload a logo.
4. Agree to the terms and click **Create App**.

## 2. Request Products
1. In your app settings, go to the **Products** tab.
2. Request access to **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect**.
3. These usually get approved immediately.

## 3. Get Client ID and Secret
1. Go to the **Auth** tab.
2. Copy the **Client ID** and **Client Secret**.
3. Add them to your `.env` file (though for this specific implementation, we are using a manually generated Access Token for simplicity, but these are needed if you implement OAuth flow later).

## 4. Generate Access Token
For server-side scripts without a user login flow, you often need a long-lived access token or you need to implement the OAuth 2.0 flow.
**Simplest way for now (Developer Token):**
1. In the **Auth** tab, look for **OAuth 2.0 tools**.
2. Click on the link to generate a token.
3. Select your app and the scopes `w_member_social` (for posting) and `email`, `openid`, `profile` (if needed).
4. Login and authorize.
5. Copy the **Access Token**.

**Note:** Developer tokens expire (usually 2 months). For a permanent solution, you need to implement a token refresh mechanism or a proper OAuth login flow for the admin user.

## 5. Configure Environment Variables
Add the following to your `.env` file:

```env
LINKEDIN_ACCESS_TOKEN=your_access_token_here
```

## 6. Verify
Once configured, creating a new blog post should automatically post to your LinkedIn profile.
