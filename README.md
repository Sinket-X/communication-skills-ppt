# Communication Skills PPT

A modern, interactive presentation on Communication Skills built with React, Tailwind CSS, and Framer Motion. Created for Class 10 AI students.

## Features

- **Interactive Slides**: Smooth transitions and animations using Framer Motion.
- **Responsive Design**: Looks great on desktop and presentation screens.
- **Custom Theming**: High-contrast, brutalist design with unique colors.
- **Keyboard Navigation**: Use arrow keys, spacebar, or on-screen controls to navigate.
- **Autoplay**: Sit back and let the presentation run automatically.

## Contributors

- **Prabhat Sahu** (Creator)
- Jatin
- Bhavesh
- Garima
- Rashi
- Adnan

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Deployment to Cloudflare Pages

You can easily deploy this presentation to Cloudflare Pages for free.

### Method 1: Using GitHub Integration (Recommended)

1. Create a new GitHub repository named \`communication-skill-ppt\`.
2. Push this code to your new repository:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/communication-skill-ppt.git
   git push -u origin main
   \`\`\`
3. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com).
4. Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
5. Select your \`communication-skill-ppt\` repository.
6. Configure the build settings:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: \`npm run build\`
   - **Build output directory**: \`dist\`
7. Click **Save and Deploy**.

### Method 2: Direct Upload

1. Build the project locally:
   \`\`\`bash
   npm run build
   \`\`\`
2. This will generate a \`dist\` folder containing the production-ready files.
3. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com).
4. Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Upload assets**.
5. Drag and drop the \`dist\` folder to upload it.
6. Deploy the project.

