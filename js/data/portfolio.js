/* ============================================================================
   PORTFOLIO CONTENT — the only file you need to edit to update the website.
   Change text, links, skills, projects and experience here. Keep the quotes,
   commas and brackets exactly as they are.

   Things that live OUTSIDE this file (see README.md):
   - Page title / description / social preview tags in index.html
   - The file itself: put your CV at assets/cv/ and your photo at assets/img/
   ============================================================================ */

export const portfolio = {
  /* ---------- Who you are ---------- */
  person: {
    fullName: "Nour Hany",
    firstName: "Nour",
    title: "Computer Science Student & Backend Developer",
    tagline: "Computer Science student passionate about backend development and building practical software.",
    location: "Egypt",
    email: "nourhanyhanafy2005@gmail.com",
    // Set show: false to hide the phone number from the site.
    phone: { show: true, display: "01115897600", href: "+201115897600" },
    languages: ["Arabic", "English"],
    // Set photo: null to show an "NH" monogram instead of a picture.
    photo: {
      webp: "assets/img/profile.webp",
      jpg: "assets/img/profile.jpg",
      alt: "Portrait of Nour Hany",
      width: 400,
      height: 500,
    },
  },

  /* ---------- Hero section ---------- */
  hero: {
    greeting: "Hi, I’m",
    // The typing animation cycles through these.
    typingLabel: "Focused on",
    typingWords: ["Backend Development", "Full Stack Development", "C# and .NET", "Python"],
    // Small floating badges next to the photo.
    chips: [
      { icon: "terminal", text: "C#, .NET, Python" },
      { icon: "graduation", text: "Ain Shams University, 2028" },
    ],
  },

  /* ---------- About section ---------- */
  about: {
    paragraphs: [
      "I’m a Computer Science student at Ain Shams University with a growing interest in backend development. I enjoy understanding how things work behind the scenes and turning what I learn into practical projects.",
      "I’m currently building my skills in C#, .NET, Python, databases, and web development, while working on improving my problem-solving and software development skills through hands-on experience.",
    ],
    learningLabel: "Currently building skills in",
    learning: ["C#", ".NET", "Python", "Databases", "Web development"],
    facts: [
      { icon: "graduation", label: "Education", value: "Ain Shams University", note: "Computer Science, expected 2028" },
      { icon: "pin", label: "Based in", value: "Egypt" },
      { icon: "globe", label: "Languages", value: "Arabic, English" },
      { icon: "target", label: "Career interests", value: "Backend and Full Stack", note: "C#/.NET, Java, Python, and eventually DevOps/Cloud" },
    ],
  },

  /* ---------- Skills ----------
     icon (optional) = a file name from assets/icons/tech/ without ".svg".
     Items without an icon get a small dot instead. */
  skills: [
    {
      title: "Programming languages",
      icon: "code",
      items: [
        { name: "C#", icon: "csharp" },
        { name: "C++", icon: "cplusplus" },
        { name: "Java", icon: "java" },
        { name: "Python", icon: "python" },
      ],
    },
    {
      title: "Backend",
      icon: "server",
      items: [
        { name: "C#", icon: "csharp" },
        { name: "ASP.NET Core", icon: "dotnetcore" },
        { name: ".NET", icon: "dotnetcore" },
        { name: "REST APIs" },
      ],
    },
    {
      title: "Databases",
      icon: "database",
      items: [
        { name: "SQL Server", icon: "microsoftsqlserver" },
        { name: "MySQL", icon: "mysql" },
      ],
    },
    {
      title: "Tools",
      icon: "wrench",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Visual Studio", icon: "visualstudio" },
        { name: "VS Code", icon: "vscode" },
      ],
    },
    {
      title: "Other",
      icon: "layers",
      items: [
        { name: "Object-Oriented Programming" },
        { name: "Data Structures & Algorithms" },
        { name: "Machine Learning" },
      ],
    },
  ],

  /* ---------- Projects ----------
     Optional fields: demo (live demo URL), image (path to a screenshot).
     Leave them as "" and the matching button / picture is simply not shown.
     categories = the filter buttons the project appears under. */
  projects: [
    {
      id: "contact-manager",
      name: "C++ Contact Manager",
      short: "A C++ console-based contact management system for creating, viewing, updating, and deleting contact information.",
      description:
        "A console-based Contact Management System developed in C++ using object-oriented programming principles. The project allows users to manage contact records through CRUD operations, including adding new contacts, viewing existing contacts, updating contact information, and deleting contacts. It was built to practice OOP concepts, data handling, and structuring a practical C++ application.",
      tech: ["C++", "OOP"],
      categories: ["C++"],
      features: [
        "Add new contacts",
        "View contact information",
        "Update existing contacts",
        "Delete contacts",
        "Manage contact records through CRUD operations",
        "Object-oriented design",
      ],
      role: "Developed and maintained the application, implementing and managing the CRUD operations.",
      github: "https://github.com/noorr-74/Contact-management-",
      demo: "",
      image: "",
    },
    {
      id: "titanic-prediction",
      name: "Titanic Prediction",
      short: "A machine learning project that predicts whether a Titanic passenger would survive based on their personal and travel information.",
      description:
        "A machine learning project built to predict passenger survival using the Titanic dataset. The project includes data preprocessing, analysis, model training, and prediction based on passenger features such as age, gender, passenger class, and other available information. A Streamlit interface was also used to make the model interactive and allow users to enter passenger details and receive a prediction.",
      tech: ["Python", "Machine Learning", "Streamlit"],
      categories: ["Python", "Machine Learning"],
      features: [
        "Data preprocessing and cleaning",
        "Exploratory data analysis",
        "Machine learning model training",
        "Passenger survival prediction",
        "Interactive Streamlit interface",
        "User input for generating predictions",
      ],
      role: "Developed the project independently, including data preprocessing, model development, and the Streamlit interface.",
      github: "https://github.com/noorr-74/Titanic_Prediction",
      demo: "",
      image: "",
    },

    /* To add a project, copy one block above, paste it after the last "}," and edit it.
       To remove a project, delete its whole { ... }, block. */
  ],

  /* ---------- Experience and education ----------
     type: "education" | "training" | "internship" | "work"
     period, description and tags are optional: leave "" or [] and they are not shown.
     Entries appear in the order listed here. */
  timeline: [
    {
      type: "education",
      title: "Computer Science",
      org: "Ain Shams University",
      period: "Expected 2028",
      description: "",
      tags: [],
    },
    {
      type: "training",
      title: "Full Stack .NET Training Program",
      org: "DEPI",
      period: "", // add dates here, for example "2025"
      description: "", // add a sentence about what you learned or built
      tags: [".NET", "Full Stack"],
    },
    {
      type: "internship",
      title: "DevOps Internship",
      org: "Decode Labs",
      period: "", // add dates here
      description: "", // add a sentence about what you worked on
      tags: ["DevOps"],
    },
    {
      // NOTE: your questionnaire said "Tutor Assistant" but your CV says "Coding Instructor".
      // The CV wording is used here. Change the title below if you prefer the other one.
      type: "work",
      title: "Coding Instructor",
      org: "iSchool (DEMI & DECI initiatives, MCIT)",
      period: "Summer 2025",
      description:
        "Taught Python programming fundamentals to students on a part-time basis, as part of the DEMI and DECI initiatives under the supervision of the Ministry of Communications and Information Technology (MCIT).",
      tags: ["Python", "Teaching"],
    },
  ],

  /* ---------- Links ---------- */
  socials: [
    { id: "github", label: "GitHub", handle: "noorr-74", url: "https://github.com/noorr-74" },
    { id: "linkedin", label: "LinkedIn", handle: "noorrhany22", url: "https://www.linkedin.com/in/noorrhany22/" },
    { id: "codeforces", label: "Codeforces", handle: "noorr74", url: "https://codeforces.com/profile/noorr74" },
  ],

  /* ---------- CV buttons ----------
     Replace the PDF at assets/cv/ (keep the same file name) or change file below. */
  cv: {
    file: "assets/cv/Nour_Hany_CV.pdf",
    downloadName: "Nour_Hany_CV.pdf",
    showView: true,
    showDownload: true,
  },

  /* ---------- Contact section ---------- */
  contact: {
    heading: "Let’s connect",
    text: "Whether it is a question, an opportunity, or a project idea, my inbox is open.",
  },
};
