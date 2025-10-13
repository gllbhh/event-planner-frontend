# Event Planner

A web application for creating, managing, and joining events.

## Features

- Create new events with title, description, date, time, and participant limits
- View a list of all upcoming events
- Join events as an attendee
- Manage your own events (edit, delete, manage attendees)
- See who is attending each event

## Live Demo

The frontend is available here:  
[https://nice-dune-017294103.1.azurestaticapps.net/](https://nice-dune-017294103.1.azurestaticapps.net/)

## Tech Stack

- **Frontend:** React, TypeScript, Bootstrap
- **Backend:** Node.js, Express (hosted separately)
- **Database:** MySQL (for event and attendee data)
- **Hosting:** Azure Static Web Apps (frontend), Azure (backend API)

## Getting Started

### Prerequisites

- Node.js (v18 or v20 recommended)
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/event-planner-frontend.git
    cd event-planner-frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

4. The app will be available at `http://localhost:5173` (or as shown in your terminal).

### Configuration

- The frontend expects the backend API to be available at  
  `https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/`
- Update API URLs in the code if your backend endpoint changes.

## Usage

- Visit the [live site](https://nice-dune-017294103.1.azurestaticapps.net/) to create or join events.
- Use the management code provided when creating an event to edit or delete your event later.

## License

MIT

---

**Feel free to contribute or open issues for bugs and feature requests!**