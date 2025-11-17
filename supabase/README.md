# Supabase Database Setup

This directory contains the database migrations for the WYKILLA website.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be provisioned

### 2. Run the Migration

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `migrations/001_initial_schema.sql`
5. Paste into the SQL Editor
6. Click **Run** to execute the migration

### 3. Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy the following values to your `.env.local` file:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update the Supabase credentials in `.env.local` with the values from step 3.

## Database Schema

### Tables

- **users**: User accounts (email, name, created_at)
- **subscriptions**: Stripe subscription data (plan, status, customer_id)
- **api_usage**: API usage tracking for AI tools (tool, tokens_used, cost_usd)

### Security

All tables have **Row Level Security (RLS)** enabled:
- Users can only read their own data
- Service role (API routes) has full access via service_role key

## Verifying the Setup

You can verify the tables were created correctly by running this query in the SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

You should see: `users`, `subscriptions`, `api_usage`
