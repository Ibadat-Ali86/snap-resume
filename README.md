# AI Resume Builder

A modern, professional resume builder application built with React, TypeScript, and Supabase. Create beautiful, ATS-friendly resumes with real-time preview and PDF export functionality.

## ✨ Features

- **Smart Resume Builder**: Step-by-step form with personal info, experience, education, projects, and skills sections
- **Real-time Preview**: See your resume update in real-time as you fill out the forms
- **PDF Export**: Download your resume as a high-quality PDF document
- **User Authentication**: Secure sign-up and login with Supabase Auth
- **Data Persistence**: Save and load your resume data automatically
- **Professional Templates**: Clean, ATS-friendly resume layouts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Projects Section**: Showcase your projects with technologies, links, and achievements
- **In-Progress Education**: Mark education as currently in progress
- **Skills Categorization**: Organize skills by technical, soft skills, and languages

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **PDF Generation**: html2canvas + jsPDF
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🌐 Deployment

### Option 1: Deploy with Lovable (Recommended)
1. Open [Lovable Project](https://lovable.dev/projects/c47f629c-8d5c-447f-9033-651238c0fd1b)
2. Click **Share → Publish** 
3. Your app will be deployed instantly with a custom domain
4. Connect your own domain in Project Settings if desired

### Option 2: Deploy to Vercel
1. Push your code to GitHub using Lovable's GitHub integration
2. Visit [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy" - your app will be live in minutes!

### Option 3: Deploy to Netlify
1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com) and sign in
3. Click "New site from Git" and connect your repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Deploy automatically

### Option 4: Other Hosting Providers
Build the project locally and upload to any hosting provider:
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🔧 Environment Configuration

The application uses Supabase for backend services. Configuration is handled automatically through Lovable's integration:

- **Project ID**: `znilfkwojxkmbuwjmjmw`
- **Supabase URL**: Auto-configured
- **Anon Key**: Auto-configured

For self-hosting, set up your own Supabase project and update `src/integrations/supabase/client.ts`.

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   ├── builder/           # Resume builder forms and preview
│   └── ui/               # Reusable UI components (shadcn/ui)
├── pages/                # Route components
├── lib/                  # Utilities and stores
├── integrations/         # Supabase integration
└── hooks/               # Custom React hooks
```

## 🎯 Usage

1. **Sign Up/Login**: Create an account or sign in to save your resume
2. **Personal Information**: Fill in your basic details and professional summary
3. **Experience**: Add your work experience with achievements
4. **Education**: Include your educational background (mark as in-progress if needed)
5. **Projects**: Showcase your projects with technologies and links
6. **Skills**: Add technical skills, soft skills, and languages
7. **Preview & Download**: Review your resume and download as PDF

## 🔗 Live Demo

- **Lovable Staging**: Available through the Lovable project dashboard
- **Production**: Deploy using any of the methods above

## 🛠️ Development

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Using Lovable
- Visit the [Lovable Project](https://lovable.dev/projects/c47f629c-8d5c-447f-9033-651238c0fd1b)
- Make changes through the AI-powered interface
- Changes automatically sync to this repository

### Using Your IDE
- Clone this repository
- Make changes locally
- Push to GitHub - changes sync to Lovable automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - The AI-powered web development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://radix-ui.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Powered by [Supabase](https://supabase.com/) for backend services

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the [Lovable documentation](https://docs.lovable.dev/)
- Join the [Lovable Discord community](https://discord.com/channels/1119885301872070706/1280461670979993613)

## 🌟 Custom Domain

To connect a custom domain:
1. Navigate to Project → Settings → Domains in Lovable
2. Click "Connect Domain" 
3. Follow the setup instructions

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

**Built with ❤️ using Lovable**