# Edukurve - Modern Learning Management System

A comprehensive, full-stack Learning Management System (LMS) built with Next.js 15, featuring AI-powered learning experiences, course management, and interactive learning tools.

## 🚀 Features

### For Students

- **Course Discovery**: Browse and explore a wide range of courses
- **Interactive Learning**: Engage with video lessons, quizzes, and hands-on projects
- **Progress Tracking**: Monitor your learning progress with detailed analytics
- **Personalized Dashboard**: Access enrolled courses and track completion
- **Payment Integration**: Secure Stripe-powered course purchases
- **Email Verification**: Secure account creation with email verification

### For Instructors/Admins

- **Course Management**: Create, edit, and manage courses with rich content
- **Content Organization**: Structure courses with chapters and lessons
- **File Management**: Upload and manage course materials (videos, images, documents)
- **Analytics Dashboard**: View enrollment statistics and course performance
- **User Management**: Manage student enrollments and user accounts
- **Rich Text Editor**: Create engaging course content with TipTap editor

### Technical Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Authentication**: Secure authentication with Better Auth
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: AWS S3 integration for course materials
- **Payment Processing**: Stripe integration for course purchases
- **Email Services**: Resend integration for notifications
- **Real-time Updates**: Server-side rendering with dynamic content
- **Responsive Design**: Mobile-first responsive UI
- **Dark/Light Mode**: Theme switching capability

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Custom components
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Better Auth
- **File Storage**: AWS S3
- **Payments**: Stripe
- **Email**: Resend
- **Rich Text Editor**: TipTap
- **Charts**: Recharts
- **Package Manager**: pnpm

## 📁 Project Structure

```
edukurve/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (landing)/         # Public landing pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── dashboard/         # Student dashboard
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   ├── data/                  # Data access layer
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   └── providers/             # React providers
├── prisma/                    # Database schema
├── public/                    # Static assets
└── components.json           # UI component configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database
- AWS S3 bucket (for file storage)
- Stripe account (for payments)
- Resend account (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd edukurve
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/edukurve"

   # Authentication
   AUTH_SECRET="your-auth-secret"
   AUTH_URL="http://localhost:3000"

   # AWS S3
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="your-aws-region"
   S3_BUCKET_NAME="your-s3-bucket"

   # Stripe
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

   # Resend
   RESEND_API_KEY="your-resend-api-key"

   # Arcjet (Rate limiting)
   ARCJET_KEY="your-arcjet-key"
   ```

4. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Usage

### For Students

1. **Browse Courses**: Visit `/courses` to explore available courses
2. **Create Account**: Sign up and verify your email
3. **Purchase Courses**: Use Stripe to securely purchase courses
4. **Start Learning**: Access your dashboard to begin learning
5. **Track Progress**: Monitor your progress through the dashboard

### For Instructors/Admins

1. **Access Admin Panel**: Navigate to `/admin` (requires admin role)
2. **Create Courses**: Use the course creation wizard
3. **Add Content**: Upload videos, images, and create lesson content
4. **Manage Structure**: Organize courses with chapters and lessons
5. **Monitor Analytics**: View enrollment and performance statistics

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prisma generate` - Generate Prisma client
- `pnpm prisma db push` - Push schema changes to database

### Database Schema

The application uses a comprehensive database schema with the following main entities:

- **User**: User accounts with authentication and profile data
- **Course**: Course information, pricing, and metadata
- **Chapter**: Course chapters for content organization
- **Lesson**: Individual lessons with video content
- **Enrollment**: Student course enrollments
- **LessonProgress**: Student progress tracking

### API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/s3/upload` - File upload to S3
- `/api/s3/delete` - File deletion from S3
- `/api/webhook/stripe` - Stripe webhook handling

## 🎨 UI Components

The project uses a custom UI component library built with:

- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon library

## 🔒 Security Features

- **Rate Limiting**: Arcjet integration for API protection
- **Authentication**: Secure session management
- **File Upload**: Secure S3 file handling
- **Payment Security**: Stripe-powered secure payments
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/edukurve/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Stripe](https://stripe.com/) - Payment processing
- [AWS S3](https://aws.amazon.com/s3/) - File storage

---

Built for modern education
