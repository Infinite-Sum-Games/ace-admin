import { atom } from 'recoil';
import { CampaignFrequency, Newsletter, Status,  } from "../components/NewsletterComponents/Columns";
import { campaignEditionById } from '@/pages/campaigns/CampaignEditions';
import { CampaignContentEditData } from '@/pages/campaigns/EditCampaignContent';

export const campaignEditionByIdData = atom<campaignEditionById>({
  key: 'campaignEditionByIdData', 
  default: {} as campaignEditionById,
});

export const filterDashboardCardState = atom({
  key: 'filterDashboardCardState', 
  default: 'This Year',
});

export const newCampaignMarkdownState = atom({
  key: 'newCampaignMarkdownState', 
  default: `
# [Newsletter Title]
*Date: YYYY-MM-DD*

---

## Welcome Message
Hello [Readers],

Welcome to this month's edition of our newsletter! We have some exciting updates and resources to share with you.

---

## Featured Article
### [Article Title]
*Author: [Author Name]*  
*Published on: YYYY-MM-DD*

[Brief introduction to the article or summary. You can include a link to read more.](#)

---

## Upcoming Events
### [Event Title]
- **Date:** YYYY-MM-DD
- **Time:** HH:MM AM/PM
- **Location:** [Venue or Link to Event]
  
[Short description of the event and a link for registration if applicable.]

---

## Community Highlights
- **Highlight 1:** [Description or link]
- **Highlight 2:** [Description or link]
- **Highlight 3:** [Description or link]

---

## Resources
- [Resource Title 1](#) - Brief description of what this resource offers.
- [Resource Title 2](#) - Brief description of what this resource offers.
- [Resource Title 3](#) - Brief description of what this resource offers.

---

## Contact Information
For questions or contributions, please reach out to us at [email@example.com].

---

Thank you for reading! We look forward to sharing more updates with you next month.

---

*Follow us on [Social Media Links]*
`, 
});

export const editedCampaignContentState = atom({
  key: "editedCampaignContentState",
  default: {} as CampaignContentEditData,
});

export const campaignData = atom<Newsletter[]>({
  key: "campaignData",
  default: [
    {
      id: "1",
      campaignTitle: "The Monthly Roundup - September",
      blurb: "Catch up on the latest news and updates from our community.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2022-09-01T10:00:00.000Z"),
      updatedAt: new Date("2022-09-01T10:00:00.000Z"),
      campaignContent: [
        {
          id: 1,
          campaignId: "1",
          content: "In this issue, we cover our recent events.",
          status: Status.Published,
          scheduledOn: new Date("2022-09-10T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "2",
      campaignTitle: "Tips for Fall Gardening",
      blurb: "Prepare your garden for the fall season.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2023-09-03T12:00:00.000Z"),
      updatedAt: new Date("2023-09-03T12:00:00.000Z"),
      campaignContent: [
        {
          id: 2,
          campaignId: "2",
          content: "Learn about soil preparation techniques.",
          status: Status.Draft,
          scheduledOn: new Date("2023-09-15T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "3",
      campaignTitle: "Tech Trends to Watch",
      blurb: "Explore the latest technology trends.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2021-09-05T09:00:00.000Z"),
      updatedAt: new Date("2021-09-05T09:00:00.000Z"),
      campaignContent: [
        {
          id: 3,
          campaignId: "3",
          content: "This month, we dive into AI advancements.",
          status: Status.Published,
          scheduledOn: new Date("2021-09-10T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "4",
      campaignTitle: "Healthy Eating: Fall Recipes",
      blurb: "Try these delicious and nutritious recipes.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2020-09-07T14:00:00.000Z"),
      updatedAt: new Date("2020-09-07T14:00:00.000Z"),
      campaignContent: [
        {
          id: 4,
          campaignId: "4",
          content: "From hearty soups to pumpkin delights.",
          status: Status.Draft,
          scheduledOn: new Date("2020-09-20T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "5",
      campaignTitle: "Community Spotlight: Local Artists",
      blurb: "Meet the talented artists in our community.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2024-09-10T11:00:00.000Z"),
      updatedAt: new Date("2024-09-10T11:00:00.000Z"),
      campaignContent: [
        {
          id: 5,
          campaignId: "5",
          content: "Interviews with local painters and musicians.",
          status: Status.Published,
          scheduledOn: new Date("2024-09-15T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "6",
      campaignTitle: "Back to School Tips",
      blurb: "Get ready for a successful school year.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2023-09-12T15:00:00.000Z"),
      updatedAt: new Date("2023-09-12T15:00:00.000Z"),
      campaignContent: [
        {
          id: 6,
          campaignId: "6",
          content: "Tips for study habits and balancing activities.",
          status: Status.Draft,
          scheduledOn: new Date("2023-09-20T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "7",
      campaignTitle: "Exploring Local History",
      blurb: "Discover the rich history of our town.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2022-09-15T13:00:00.000Z"),
      updatedAt: new Date("2022-09-15T13:00:00.000Z"),
      campaignContent: [
        {
          id: 7,
          campaignId: "7",
          content: "Uncover stories from the past.",
          status: Status.Published,
          scheduledOn: new Date("2022-09-25T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "8",
      campaignTitle: "Fitness for Fall",
      blurb: "Stay active this fall with these routines.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2021-09-17T16:00:00.000Z"),
      updatedAt: new Date("2021-09-17T16:00:00.000Z"),
      campaignContent: [
        {
          id: 8,
          campaignId: "8",
          content: "Tips on outdoor exercises and local classes.",
          status: Status.Draft,
          scheduledOn: new Date("2021-09-30T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "9",
      campaignTitle: "Sustainable Living",
      blurb: "Make eco-friendly choices in your life.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2020-09-20T10:00:00.000Z"),
      updatedAt: new Date("2020-09-20T10:00:00.000Z"),
      campaignContent: [
        {
          id: 9,
          campaignId: "9",
          content: "Explore tips for reducing waste.",
          status: Status.Published,
          scheduledOn: new Date("2020-10-01T10:00:00.000Z"),
        },
      ],
      subscribers: [],
    },
    {
      id: "10",
      campaignTitle: "Mental Health Awareness",
      blurb: "Understanding mental health and seeking help.",
      frequency: CampaignFrequency.Monthly,
      createdAt: new Date("2024-09-22T12:00:00.000Z"),
      updatedAt: new Date("2024-09-22T12:00:00.000Z"),
      campaignContent: [
        {
          id: 10,
          campaignId: "10",
          content: "Discussing common mental health issues.",
          status: Status.Draft,
          scheduledOn: new Date("2024-09-30T10:00:00.000Z"),
        },
        {
          id: 11,
          campaignId: "10",
          content: "Resources for mental health support.",
          status: Status.Published,
          scheduledOn: new Date("2024-10-01T10:00:00.000Z"),
        }
      ],
      subscribers: [],
    },
  ],
});
