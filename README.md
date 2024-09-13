![lorebound-banner](https://github.com/user-attachments/assets/ef2ef697-e106-470b-8f88-0def04736365)
![Flask](https://img.shields.io/badge/Flask-grey?logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-grey?logo=react&logoColor=pink)
![Redux](https://img.shields.io/badge/Redux-grey?logo=redux&logoColor=purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-grey?logo=postgresql&logoColor=blue)
![Docker](https://img.shields.io/badge/Docker-grey?logo=docker&logoColor=blue)
![AWS](https://img.shields.io/badge/AWS_S3-grey?logo=amazons3&logoColor=orange)
![Quill.js](https://img.shields.io/badge/Quill.js-grey?logo=quilljs&logoColor=black)
![ReportLab](https://img.shields.io/badge/ReportLab-grey?logo=adobeacrobatreader&logoColor=yellow)
![react-bootstrap-typeahead](https://img.shields.io/badge/react--bootstrap--typeahead-grey?logo=bootstrap&logoColor=red)
![react-calendar](https://img.shields.io/badge/react--calendar-grey?logo=react&logoColor=purple)

# **Welcome to Lorebound!**

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Clone the Repository](#clone-the-repository)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)

---

## Introduction
[Lorebound](https://lorebound.onrender.com) is a web application designed for TTRPG enthusiasts who need a seamless experience for both note-taking and creating character sheets. Whether you're organizing your campaign notes or building intricate character sheets, Lorebound is your go-to tool. With an intuitive interface, the app offers rich text editing, seamless file exports, and real-time character tracking.

## Features
-   **Create TTRPG Character Sheets**: Build and manage character sheets with ease.
-   **Note-Taking**: Keep detailed campaign notes using a built-in rich text editor.
-   **PDF Export**: Export character sheets to PDF format.
-   **Real-time updates**: Save and update your work instantly.

## Tech Stack
**Backend**:

-   Python
-   Flask
-   SQLAlchemy
-   PostgreSQL (Database)

**Frontend**:

-   JavaScript (ES6+)
-   React
-   Redux

**Other Technologies**:

-   AWS (Image Hosting)
-   Quill.js (Rich Text Editor)
-   ReportLab (PDF Export)
-   react-calendar
-   react-bootstrap-typeahead
-   Docker (Containerization)

## Getting Started
Follow these steps to clone and run Lorebound locally:

### Prerequisites

1.  Install [Python](https://www.python.org/downloads/).
2.  Install [Node.js](https://nodejs.org/en/download/package-manager).

### Clone the Repository
To clone the project:
- `git clone https://github.com/vinob09/lorebound.git` 
- `cd lorebound`

### Backend Setup
1. Install dependencies:
	```bash
	pipenv install -r requirements.txt
	```
2.  Create a __.env__ file with proper settings for your development environment, including any S3 keys if using. 
	```bash
	SECRET_KEY={secret_key_here} (make sure to use snake_case convention here)
	DATABASE_URL={sqlite:///dev.db} 
	SCHEMA={schema_name_here}
	S3_BUCKET={bucket_name_here}
	S3_KEY={key_here}
	S3_SECRET={secret_here}
	```
3.  Get into your pipenv, migrate your database, seed your database, and run your
Flask app:
	```bash
	pipenv shell
	```
	```bash
	flask db upgrade
	```
	```bash
	flask seed all
	```
	```bash
	flask run
	```
### Frontend Setup
1.  To run the React frontend in development, `cd` into the __react-vite__ directory and run `npm i` to install dependencies. The Dockerfile has a `--watch` flag attached to the `dist` build, and will containerize the entire application, making it easier to set up and deploy. Then, run `npm run dev` to view a local version of the project on your browser. 

