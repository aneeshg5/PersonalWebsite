# PersonalWebsite

A visually rich, interactive, and fully responsive developer portfolio built with **Next.js 14**, **React**, and **Tailwind CSS**. This project showcases my work, skills, and contact information, and is designed for both desktop and mobile users. It features animated backgrounds, project modals, a contact form with EmailJS integration, and more.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, SSR/SSG, TypeScript)
- **UI Library:** [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** Custom & [shadcn/ui](https://ui.shadcn.com/)
- **Email:** [EmailJS](https://www.emailjs.com/) (client-side email sending)
- **Animations:** Custom CSS, [Framer Motion](https://www.framer.com/motion/) (optional)
- **Other:** TypeScript, Radix UI Primitives, custom hooks

---

## 🧩 Main Components

- **`components/sections/home.tsx`** – Animated hero section with intro and CTA.
- **`components/sections/about.tsx`** – About me, highlights, and an image carousel.
- **`components/sections/portfolio.tsx`** – Scrollable project cards, each opening a detailed modal with images and captions.
- **`components/sections/skills.tsx`** – Tabbed skills section with proficiency bars.
- **`components/sections/contact.tsx`** – Contact form with EmailJS integration and toast notifications.
- **`components/top-navigation.tsx`** – Responsive navigation bar with social links.
- **`components/space-background.tsx`** – Animated starfield background.
- **`components/ui/`** – Reusable UI primitives (cards, buttons, tabs, progress, toast, etc.).
- **`components/project-modal.tsx`** – Modal for detailed project views with image carousel and captions.

---

## 🛠️ Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/modern-portfolio.git
cd modern-portfolio
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env.local` file in the root directory and add your EmailJS credentials:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** Never commit `.env.local` to public repositories.

### 4. **Run the Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 5. **Build for Production**

```bash
npm run build
npm start
```

---

## ✨ Features

- **Animated Hero & Background:** Engaging animated intro and starfield.
- **Responsive Design:** Looks great on all devices.
- **Project Portfolio:** Scrollable cards, modals with image carousels and captions.
- **Skills Tabs:** Tabbed interface with proficiency bars.
- **Contact Form:** EmailJS-powered, with toast notifications for feedback.
- **Accessible & Keyboard-Friendly:** Uses semantic HTML and accessible components.
- **Customizable:** Easily add new projects, skills, or sections.

---

## 📝 Customization

- **Add Projects:** Edit `components/sections/portfolio.tsx` and update the `projects` array.
- **Edit Skills:** Update the `skillGroups` array in `components/sections/skills.tsx`.
- **Change Images:** Place new images in the `public/images/` directory and update references.
- **Update Social Links:** Edit `components/top-navigation.tsx`.

---

## ⚠️ Important Notes

- **EmailJS:** For the contact form to work, you must set up an EmailJS account and configure your template and service.
- **Environment Variables:** Keep your `.env.local` file private.
- **Deployment:** For public deployment, use [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or your preferred host. Set environment variables in your host’s dashboard.

---

## 📂 Project Structure

```
components/
  sections/
    about.tsx
    contact.tsx
    home.tsx
    portfolio.tsx
    skills.tsx
  ui/
    ... (UI primitives)
  project-modal.tsx
  space-background.tsx
  top-navigation.tsx
public/
  images/
    ... (profile, project, and carousel images)
app/
  layout.tsx
  page.tsx
hooks/
  use-toast.ts
.env.local
tailwind.config.ts
next.config.mjs
```

---

## 🙏 Credits

- [shadcn/ui](https://ui.shadcn.com/) for UI inspiration and components.
- [Lucide Icons](https://lucide.dev/) for iconography.
- [EmailJS](https://www.emailjs.com/) for email integration.

---

## 📧 Contact

Feel free to reach out via the contact form on the site or connect with me on [LinkedIn](https://www.linkedin.com/in/aneesh-ganti-ba606326b/) or [GitHub](https://github.com/aneeshg5).

---

**Enjoy exploring the code and feel free to fork or