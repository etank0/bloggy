
# Bloggy

<p align="center">
  <a href="#">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/etank0/bloggy/blob/main/src/assets/bloggyNav-dark.svg">
      <img alt="Bloggy banner" src="https://github.com/etank0/bloggy/blob/main/src/assets/bloggyNav.svg" height="110px">
    </picture>
  </a>
</p>

**Bloggy** is an open-source blogging platform built with **React**, **Vite**, and **Appwrite**. It leverages modern libraries such as **Dropzone**, **TinyMCE**, and **react-hook-form**, among others, to provide a robust and user-friendly blogging experience.

## Features
- **Rich Text Editor**: Powered by TinyMCE for advanced content creation.
- **File Uploads**: Seamlessly handle media uploads with Dropzone.
- **Form Management**: Simplified form handling using react-hook-form.
- **Backend**: Appwrite for authentication, database, and storage.
- **Fast Development**: Built on Vite for lightning-fast builds and hot-reloads.

## Demo
[Live Demo](https://bloggy-rust.vercel.app)
---

## Table of Contents
- [Installation](#installation)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites
1. **Node.js**: Ensure you have the correct Node.js version installed. The project specifies the required version in the `.nvmrc` file.
   ```bash
   nvm install
   nvm use
   ```

2. **Package Manager**: `npm` (comes with Node.js).

### Clone the Repository
```bash
git clone https://github.com/etank0/bloggy.git
cd bloggy
```

### Install Dependencies
```bash
npm install
```

---

## Local Development

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## Deployment
To deploy Bloggy, configure the backend with **Appwrite** services and ensure the frontend is pointed to the correct Appwrite API endpoint. Deploy the frontend using a hosting service like Vercel, Netlify, or any other preferred provider.

---

## Contributing

We welcome contributions from the community! To get started:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
Need help? Open an issue or reach out to the maintainers. 😊
