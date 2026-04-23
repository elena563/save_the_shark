# Save the Shark - Little Full Stack Project

## Project Description

This website is designed for the fictional no profit organization Save the Shark, dedicated to the preservation of the sea and its inhabitants, with a particular attention for sharks. Users can read about the association, its mission, goals and story, explore the charity merchandising and join the community with a form. In the "discover" section, many species of shark are shortly descripted and represented, in order to inform about an animal that is often poorly known. 

**Save the Shark is a fictional association** - this project website is not linked to any real organization. Every contact or specific information is fictional for illustrative purposes only.

### Project Evolution

- **2023**: Initial development with static HTML/CSS/JavaScript pages
- **2025**: Migration to Hugo static site generator and deployment
- **2026**: Integration of Stripe payment gateway with Express.js backend for secure donation processing

### Project Sections

- Header with responsive navigation menu
- Homepage (index): Hero section, about us section
- Merch: charity merchandising store
- Donate: **Stripe Checkout integration** with secure payment processing and user information form
- Discover: shark species informative section
- Footer with contacting information and social media icons

## Live Demo

🌐 **Visit the live site**: [savetheshark.netlify.app](https://savetheshark.netlify.app)

Explore the user interface and navigate through different sections to experience the implemented features.

## Code Exploration on GitHub

📁 **Repository**: [github.com/elena563/save_the_shark](https://github.com/elena563/save_the_shark)

Browse through folders to examine the project's structure and check commits to track the development over time.

## Project Features

- **Informative Content**: Engaging content to educate users about shark characteristics, conservation and differences among species.
- **Secure Donations**: Integration with Stripe Checkout for safe and reliable payment processing (test mode only).
- **Donation and Volunteer**: Enhancements to promote user participation in the shark conservation community.
- **No Profit Store Design**: Little store with gadgets about sharks, to sustain with less engagement.
- **Responsive Design**: Ensures seamless experience across various devices.

## Technologies Used

### Frontend
- **Hugo** - Static site generator
- **HTML, CSS, JavaScript** - Core web technologies
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Stripe API** - Payment processing (test mode)
- **dotenv** - Environment variable management

### Payment Integration (Test Mode Only)
This project uses **Stripe in test mode** for demonstration purposes. No real payments are processed. Test card details:
- Card number: `4242 4242 4242 4242`
- Any future expiry date and any 3-digit CVV

## Project Structure

```
save_the_shark/
├── frontend/              # Hugo static site
│   ├── layouts/          # HTML templates
│   ├── content/          # Markdown content
│   ├── static/           # Static assets (images, js, css)
│   └── hugo.toml         # Hugo configuration
├── backend/              # Express.js server
│   ├── stripe.js         # Stripe integration
│   ├── public/           # Success/cancel pages
│   └── .env              # Environment variables (not in repo)
└── package.json          # Node.js dependencies
```

## Deployment

- **Frontend**: Hosted on [Netlify](https://www.netlify.com/)
- **Backend**: Hosted on [Back4App](https://www.back4app.com/)

## Contributions

If you want to contribute to improving the project, feel free to open an issue or contact me. I will be grateful for every suggestion.

## Important Notes

**Test Mode Only**: This project uses Stripe in test mode. No real payments are processed. Always use test card numbers when testing the donation feature.

**Educational Purpose**: This is a portfolio/educational project demonstrating full-stack web development skills including payment gateway integration.

---

Thank you for your interest in the Save the Shark project! 🦈
