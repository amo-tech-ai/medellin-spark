# Venue Architecture

## ✅ Current Design (Best Practice)

The venue system uses a **many-to-many relationship** pattern:

```
venues (1) ←→ (M) event_venues (M) ←→ (1) events
```

### Tables

#### 1. `venues` - Main Venues Table
Stores venue information that can be reused across events.

```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Medellín',
  country TEXT NOT NULL DEFAULT 'Colombia',
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  capacity INTEGER,
  description TEXT,
  amenities TEXT[],
  image_url TEXT,
  created_by UUID REFERENCES profiles(id)
);
```

#### 2. `event_venues` - Junction Table
Links events to venues (many-to-many).

```sql
CREATE TABLE event_venues (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, venue_id)
);
```

#### 3. `events` - Events Table
Events can be virtual, in-person, or hybrid.

```sql
CREATE TABLE events (
  -- ... other fields ...
  is_virtual BOOLEAN NOT NULL DEFAULT false,
  virtual_url TEXT,
  -- Virtual events: is_virtual=true, virtual_url set, no venues
  -- In-person: is_virtual=false, venues via event_venues
  -- Hybrid: is_virtual=true, virtual_url set, AND venues via event_venues
);
```

## 🎯 Why This Design?

### ✅ Advantages

1. **Reusability**: Venues can be used by multiple events
   - Ruta N can host many different events
   - No duplicate venue data

2. **Multiple Locations**: Events can have multiple venues
   - Conferences with breakout rooms
   - City-wide festivals
   - Multi-location tours

3. **Hybrid Events**: Support virtual + physical
   - Event can have `is_virtual=true` AND venues
   - Best of both worlds

4. **Data Integrity**: Single source of truth
   - Update venue once, reflects everywhere
   - Consistent address, capacity, amenities

5. **Flexibility**: Easy to query
   ```sql
   -- Get all events at a venue
   SELECT e.* FROM events e
   JOIN event_venues ev ON ev.event_id = e.id
   WHERE ev.venue_id = 'venue-uuid';
   
   -- Get all venues for an event
   SELECT v.* FROM venues v
   JOIN event_venues ev ON ev.venue_id = v.id
   WHERE ev.event_id = 'event-uuid';
   ```

### ❌ What We Avoided

**Bad Pattern 1**: `events.venue_id` (single venue only)
- Can't support multi-location events
- Can't support hybrid (virtual + physical)

**Bad Pattern 2**: `events.location TEXT` (unstructured)
- No reusability
- No geolocation
- Hard to query/filter
- Duplicate data

## 🔒 RLS Policies

### Venues
- ✅ **SELECT**: Public read access (anon + authenticated)
- ✅ **INSERT**: Admin only
- ✅ **UPDATE**: Admin or venue creator
- ✅ **DELETE**: Admin only

### Event_Venues
- ✅ **SELECT**: Public read access
- ✅ **INSERT**: Event organizer only
- ✅ **DELETE**: Event organizer only

## 📊 Sample Data Structure

### Example 1: In-Person Event
```sql
-- Event: Startup Grind at Ruta N
Event: { is_virtual: false, virtual_url: null }
Event_Venues: { event_id: 'sg-event', venue_id: 'rutan-venue' }
Venue: { name: 'Ruta N', address: 'Calle 67 #52-20' }
```

### Example 2: Virtual Event
```sql
-- Event: AI Workshop (online)
Event: { is_virtual: true, virtual_url: 'https://zoom.us/...' }
Event_Venues: (none)
Venue: (none)
```

### Example 3: Hybrid Event
```sql
-- Event: Tech Conference (hybrid)
Event: { is_virtual: true, virtual_url: 'https://zoom.us/...' }
Event_Venues: { event_id: 'conf-event', venue_id: 'convention-center' }
Venue: { name: 'Plaza Mayor', address: 'Calle 41 #55-80' }
```

### Example 4: Multi-Location Event
```sql
-- Event: Startup Crawl (3 locations)
Event: { is_virtual: false, virtual_url: null }
Event_Venues: [
  { event_id: 'crawl-event', venue_id: 'rutan-venue' },
  { event_id: 'crawl-event', venue_id: 'atomhouse-venue' },
  { event_id: 'crawl-event', venue_id: 'selina-venue' }
]
```

## 🚀 Usage Examples

### Create Venue
```sql
INSERT INTO venues (name, address, city, capacity, created_by)
VALUES (
  'Ruta N',
  'Calle 67 #52-20',
  'Medellín',
  200,
  current_profile_id()
);
```

### Link Event to Venue
```sql
INSERT INTO event_venues (event_id, venue_id)
VALUES ('event-uuid', 'venue-uuid');
```

### Query: Get Event with Venues
```sql
SELECT 
  e.*,
  json_agg(v.*) as venues
FROM events e
LEFT JOIN event_venues ev ON ev.event_id = e.id
LEFT JOIN venues v ON v.id = ev.venue_id
WHERE e.id = 'event-uuid'
GROUP BY e.id;
```

### Query: Find Events by City
```sql
SELECT DISTINCT e.*
FROM events e
JOIN event_venues ev ON ev.event_id = e.id
JOIN venues v ON v.id = ev.venue_id
WHERE v.city = 'Medellín'
  AND e.status = 'published';
```

## ✅ Architecture Validation

| Requirement | Supported | How |
|-------------|-----------|-----|
| Virtual events | ✅ | `is_virtual=true`, no venues |
| In-person events | ✅ | `is_virtual=false` + venues |
| Hybrid events | ✅ | `is_virtual=true` + venues |
| Multiple venues | ✅ | Multiple rows in event_venues |
| Venue reuse | ✅ | Same venue_id in multiple events |
| Geolocation | ✅ | lat/long in venues table |
| Capacity tracking | ✅ | venues.capacity |

**Conclusion**: ✅ Architecture is correct and follows best practices. No changes needed.

---

**Status**: ✅ Verified Correct  
**Pattern**: Many-to-Many (Junction Table)  
**Last Reviewed**: 2025-10-13
