declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    RESEND_API_KEY?: string;
    EMAIL_FROM?: string;
    TURNSTILE_SECRET_KEY?: string;
  }
}
