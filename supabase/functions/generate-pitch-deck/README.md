# Generate Pitch Deck Edge Function

This Supabase Edge Function generates AI-powered startup pitch decks using OpenAI GPT-4.

## Setup

### 1. Deploy the function

```bash
supabase functions deploy generate-pitch-deck
```

### 2. Set environment variables

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Test the function locally

```bash
supabase functions serve generate-pitch-deck
```

## Usage

### Request

```bash
curl -i --location --request POST 'https://your-project.supabase.co/functions/v1/generate-pitch-deck' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "prompt": "Generate a pitch deck for a FinTech startup that helps people save money automatically",
    "profile_id": "user-uuid-here"
  }'
```

### Response (Success)

```json
{
  "success": true,
  "deck_id": "uuid-of-created-deck",
  "title": "AutoSave Pitch Deck",
  "company_name": "AutoSave",
  "slide_count": 10
}
```

### Response (Error)

```json
{
  "error": "Error message here"
}
```

## Input Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | Yes | User's description of their startup/pitch deck |
| `profile_id` | UUID | Yes | User's profile ID from Supabase Auth |

## Output Schema

The function creates two database records:

### pitch_decks table
- `id` (UUID)
- `title` (text)
- `company_name` (text)
- `industry` (text)
- `status` ('draft', 'final', 'archived')
- `profile_id` (UUID)

### pitch_deck_slides table
- `id` (UUID, FK to pitch_decks)
- `content` (JSONB) - Array of 10 slide objects
- `outline` (text[]) - Array of slide titles
- `prompt` (text) - Original user prompt
- `language` ('en-US')

## Rate Limiting

Consider implementing rate limiting in your application:
- 10 requests per user per hour (recommended for MVP)
- Track using `pitch_decks.created_at` and `profile_id`

## Cost Optimization

- Model: `gpt-4-turbo-preview` (~$0.01-0.03 per deck)
- Average tokens: ~3000-4000 per request
- Consider caching similar prompts

## Environment Variables Required

- `OPENAI_API_KEY` - Your OpenAI API key
- `SUPABASE_URL` - Auto-provided by Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Auto-provided by Supabase

## Error Handling

The function handles the following error cases:
- Missing required fields → 400
- OpenAI API failure → 500
- Database write failure → 500 (with rollback)
- Missing environment variables → 500

## Security

- Uses Supabase Auth for user authentication
- Service role key for database writes (bypasses RLS)
- CORS enabled for web client access
- All inputs validated before processing
