# Amrita Centre for Entrepreneurship - Admin Portal

### Site Planning

```
/login 
  - forms

/otp
  - opt-component in shadcn

/dashboard
  - Statistics components
    - Active members (this year, all-time)
    - Events completed (this year, all-time)
    - Events upcoming
    - Revenue generated (this-year, last-year, all-time)
    - Campaigns (this year, all-time)
  - Summarized view
    :: Events under planning (cards)
    :: Events upcoming (cards)

/campaigns (newsletter)
  - Table view
  - Filter buttons
  - Search

/campaigns/:campaignId
  Campaign {
    subject: String
    content: Markdown -> HTML
    lists: SubscriberLists[]
    launch-date: datetime
  }

/events
  - Table view
  - Filter buttons (date-based / upcoming, completed, drafts)
  - Search bar

/events/:eventId
  Event {
    title: String
    description: String
    posterURL: String, 25MB   (imgurAPI)
    bannerURL: String, 25MB   (imgurAPI)
    tags: String[]
    venue: String
    datetime: calendar-component
    sponsors? : String[]
    guests? : String[]
    paid: boolean
    amount? : Integer
  }

/events/analytics/:eventId
  - Table view (registrations vs attendance)
  - Revenue generated : (if-paid)
  - Registrations vs Checkins
  - Registrations vs Day (Graph)
  - Year Analytics
  - Department Analytics

/blogs
  - Table view
  - Filter buttons
  - Search bar

/blogs/:blogId
  Blog {
    title: String,
    displayURL: String, 25MB (imgurAPI)
    blurb: String
    content: String
    author: String
    publishing-date: date
  }

/suggestions (low-priority)
  - Table View 
  - Filter : Read | Unread

/suggestions/:suggestionId
  title: String
  content: String
  author: username | Anonymous 
  createdAt: datetime

(additionals)
SideBar
  -> Dashboard
  -> Campaigns (clickable)
    -> New Campaign
    -> Lists
    -> Subscribers
  -> Events (not-clickable)
    -> New Events
    -> All Events (filters :: upcoming, completed, drafts)
    -> Draft Events
  -> Blogs
    -> New Blog
    -> Draft Blogs
    -> All Blogs
  -> Admin (later priority)
  -> Logout
```
