import { atom } from 'recoil';
import { Newsletter } from "../components/NewsletterComponents/Columns";

export const filterState = atom({
  key: 'filterState', 
  default: 'This Year',
});

export const markdownState = atom({
  key: 'markdownState', 
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

export const newsletterData = atom<Newsletter[]>({
  key: "newsletterData",
  default: [
    {
      id: 1,
      title: "The Monthly Roundup - September",
      blurb: "Catch up on the latest news and updates from our community.",
      content: "In this issue, we cover our recent events, feature community stories, and share upcoming initiatives. Don't miss our spotlight on local heroes!",
      status: "Published",
      createdAt: new Date("2022-09-01T10:00:00.000Z"),
      updatedAt: new Date("2022-09-01T10:00:00.000Z"),
    },
    {
      id: 2,
      title: "Tips for Fall Gardening",
      blurb: "Prepare your garden for the fall season with these expert tips.",
      content: "Learn about the best plants for fall, soil preparation techniques, and how to protect your garden from the cold.",
      status: "Draft",
      createdAt: new Date("2023-09-03T12:00:00.000Z"),
      updatedAt: new Date("2023-09-03T12:00:00.000Z"),
    },
    {
      id: 3,
      title: "Tech Trends to Watch",
      blurb: "Explore the latest technology trends shaping our future.",
      content: "This month, we dive into AI advancements, sustainable tech innovations, and the rise of remote work tools.",
      status: "Published",
      createdAt: new Date("2021-09-05T09:00:00.000Z"),
      updatedAt: new Date("2021-09-05T09:00:00.000Z"),
    },
    {
      id: 4,
      title: "Healthy Eating: Fall Recipes",
      blurb: "Try these delicious and nutritious recipes this fall.",
      content: "From hearty soups to pumpkin delights, our recipes are designed to warm you up while keeping you healthy.",
      status: "Draft",
      createdAt: new Date("2020-09-07T14:00:00.000Z"),
      updatedAt: new Date("2020-09-07T14:00:00.000Z"),
    },
    {
      id: 5,
      title: "Community Spotlight: Local Artists",
      blurb: "Meet the talented artists making a difference in our community.",
      content: "This issue features interviews with local painters, musicians, and performers who inspire us all.",
      status: "Published",
      createdAt: new Date("2024-09-10T11:00:00.000Z"),
      updatedAt: new Date("2024-09-10T11:00:00.000Z"),
    },
    {
      id: 6,
      title: "Back to School Tips",
      blurb: "Get ready for a successful school year with these essential tips.",
      content: "We cover everything from study habits to balancing extracurricular activities.",
      status: "Draft",
      createdAt: new Date("2023-09-12T15:00:00.000Z"),
      updatedAt: new Date("2023-09-12T15:00:00.000Z"),
    },
    {
      id: 7,
      title: "Exploring Local History",
      blurb: "Discover the rich history of our town with this in-depth look.",
      content: "Uncover stories from the past, including key events and influential figures who shaped our community.",
      status: "Published",
      createdAt: new Date("2022-09-15T13:00:00.000Z"),
      updatedAt: new Date("2022-09-15T13:00:00.000Z"),
    },
    {
      id: 8,
      title: "Fitness for Fall",
      blurb: "Stay active this fall with these simple fitness routines.",
      content: "We share tips on outdoor exercises, local fitness classes, and how to stay motivated as the weather changes.",
      status: "Draft",
      createdAt: new Date("2021-09-17T16:00:00.000Z"),
      updatedAt: new Date("2021-09-17T16:00:00.000Z"),
    },
    {
      id: 9,
      title: "Sustainable Living",
      blurb: "Make eco-friendly choices in your daily life.",
      content: "Explore tips for reducing waste, choosing sustainable products, and supporting local businesses.",
      status: "Published",
      createdAt: new Date("2020-09-20T10:00:00.000Z"),
      updatedAt: new Date("2020-09-20T10:00:00.000Z"),
    },
    {
      id: 10,
      title: "Mental Health Awareness",
      blurb: "Understanding mental health and how to seek help.",
      content: "We discuss common mental health issues, resources available, and ways to support yourself and others.",
      status: "Draft",
      createdAt: new Date("2024-09-22T12:00:00.000Z"),
      updatedAt: new Date("2024-09-22T12:00:00.000Z"),
    },
    {
      id: 11,
      title: "Preparing for Winter",
      blurb: "Get your home ready for the colder months ahead.",
      content: "Tips on insulation, heating systems, and winterizing your garden.",
      status: "Published",
      createdAt: new Date("2023-09-25T10:00:00.000Z"),
      updatedAt: new Date("2023-09-25T10:00:00.000Z"),
    },
    {
      id: 12,
      title: "Celebrating Diversity",
      blurb: "Highlighting the importance of diversity in our community.",
      content: "Join us as we share stories and events that celebrate our diverse backgrounds and cultures.",
      status: "Draft",
      createdAt: new Date("2022-09-27T14:00:00.000Z"),
      updatedAt: new Date("2022-09-27T14:00:00.000Z"),
    },
    {
      id: 13,
      title: "The Benefits of Volunteering",
      blurb: "Why volunteering is good for you and your community.",
      content: "We discuss various opportunities and the positive impact of giving back.",
      status: "Published",
      createdAt: new Date("2024-10-01T11:00:00.000Z"),
      updatedAt: new Date("2024-10-01T11:00:00.000Z"),
    },
    {
      id: 14,
      title: "Fall Fashion Trends",
      blurb: "Stay stylish this fall with the latest fashion trends.",
      content: "Explore the must-have clothing items and accessories for the season.",
      status: "Draft",
      createdAt: new Date("2021-10-02T15:00:00.000Z"),
      updatedAt: new Date("2021-10-02T15:00:00.000Z"),
    },
    {
      id: 15,
      title: "Home Office Setup",
      blurb: "Create a productive workspace at home.",
      content: "Tips for organizing your home office and maximizing your efficiency.",
      status: "Published",
      createdAt: new Date("2023-10-04T09:00:00.000Z"),
      updatedAt: new Date("2023-10-04T09:00:00.000Z"),
    },
    {
      id: 16,
      title: "Holiday Planning Guide",
      blurb: "Start planning for the upcoming holiday season.",
      content: "From gift ideas to meal planning, get ready for the festivities.",
      status: "Draft",
      createdAt: new Date("2022-10-06T12:00:00.000Z"),
      updatedAt: new Date("2022-10-06T12:00:00.000Z"),
    },
    {
      id: 17,
      title: "Pet Care Tips for Fall",
      blurb: "Keep your pets safe and happy during the colder months.",
      content: "Advice on grooming, health check-ups, and keeping pets warm.",
      status: "Published",
      createdAt: new Date("2024-10-08T14:00:00.000Z"),
      updatedAt: new Date("2024-10-08T14:00:00.000Z"),
    },
    {
      id: 18,
      title: "Financial Literacy for All",
      blurb: "Learn the basics of managing your finances.",
      content: "We cover budgeting, saving, and investing to help you achieve financial stability.",
      status: "Draft",
      createdAt: new Date("2021-10-10T16:00:00.000Z"),
      updatedAt: new Date("2021-10-10T16:00:00.000Z"),
    },
    {
      id: 19,
      title: "Exploring Nature Trails",
      blurb: "Discover the best local hiking spots this fall.",
      content: "A guide to scenic trails, safety tips, and enjoying the great outdoors.",
      status: "Published",
      createdAt: new Date("2023-10-12T10:00:00.000Z"),
      updatedAt: new Date("2023-10-12T10:00:00.000Z"),
    },
    {
      id: 20,
      title: "Innovations in Education",
      blurb: "How technology is changing the learning experience.",
      content: "We explore new tools and methods that enhance education.",
      status: "Draft",
      createdAt: new Date("2022-10-15T12:00:00.000Z"),
      updatedAt: new Date("2022-10-15T12:00:00.000Z"),
    },
    {
      id: 21,
      title: "Fall Cleaning Checklist",
      blurb: "Get your home ready for the new season with our checklist.",
      content: "Tips for decluttering, deep cleaning, and organizing your space.",
      status: "Published",
      createdAt: new Date("2024-10-18T14:00:00.000Z"),
      updatedAt: new Date("2024-10-18T14:00:00.000Z"),
    },
    {
      id: 22,
      title: "Mindfulness and Meditation",
      blurb: "Explore the benefits of mindfulness practices.",
      content: "Learn how meditation can improve your mental health and overall well-being.",
      status: "Draft",
      createdAt: new Date("2021-10-20T10:00:00.000Z"),
      updatedAt: new Date("2021-10-20T10:00:00.000Z"),
    },
    {
      id: 23,
      title: "Tips for Eco-Friendly Home",
      blurb: "Make your home more sustainable with these tips.",
      content: "Explore ways to reduce your carbon footprint and save energy.",
      status: "Published",
      createdAt: new Date("2023-10-22T12:00:00.000Z"),
      updatedAt: new Date("2023-10-22T12:00:00.000Z"),
    },
    {
      id: 24,
      title: "Local Food Producers",
      blurb: "Support local farms and food producers.",
      content: "A guide to the best local produce and how to shop sustainably.",
      status: "Draft",
      createdAt: new Date("2022-10-25T14:00:00.000Z"),
      updatedAt: new Date("2022-10-25T14:00:00.000Z"),
    },
    {
      id: 25,
      title: "Preparing for the Holidays",
      blurb: "Tips to ensure a stress-free holiday season.",
      content: "Plan ahead for gifts, meals, and family gatherings.",
      status: "Published",
      createdAt: new Date("2024-10-28T11:00:00.000Z"),
      updatedAt: new Date("2024-10-28T11:00:00.000Z"),
    },
    {
      id: 26,
      title: "Winter Health Tips",
      blurb: "Stay healthy during the cold winter months.",
      content: "Advice on nutrition, exercise, and mental wellness.",
      status: "Draft",
      createdAt: new Date("2021-10-30T13:00:00.000Z"),
      updatedAt: new Date("2021-10-30T13:00:00.000Z"),
    },
    {
      id: 27,
      title: "Celebrating Local Heroes",
      blurb: "Recognizing those who make a difference in our community.",
      content: "We highlight inspiring stories of local individuals who give back.",
      status: "Published",
      createdAt: new Date("2023-11-02T10:00:00.000Z"),
      updatedAt: new Date("2023-11-02T10:00:00.000Z"),
    },
    {
      id: 28,
      title: "Art in the Community",
      blurb: "The impact of art on our local culture.",
      content: "We explore local galleries, art events, and community projects.",
      status: "Draft",
      createdAt: new Date("2022-11-05T12:00:00.000Z"),
      updatedAt: new Date("2022-11-05T12:00:00.000Z"),
    },
    {
      id: 29,
      title: "Seasonal Affective Disorder",
      blurb: "Understanding and coping with SAD during winter months.",
      content: "Tips for maintaining mental health as the days grow shorter.",
      status: "Published",
      createdAt: new Date("2023-11-07T14:00:00.000Z"),
      updatedAt: new Date("2023-11-07T14:00:00.000Z"),
    },
    {
      id: 30,
      title: "Preparing for 2025",
      blurb: "Goal-setting for the new year.",
      content: "How to set achievable goals and stay motivated.",
      status: "Draft",
      createdAt: new Date("2024-11-09T16:00:00.000Z"),
      updatedAt: new Date("2024-11-09T16:00:00.000Z"),
    },
  ],
});
