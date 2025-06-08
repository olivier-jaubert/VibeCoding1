# Personal Gallery: Olivier's Friday Art journey

![Olivier Jaubert](src/assets/annex/Picture_OJ.jpg)

_Biomedical Imaging Scientist 🧬 during the week, but artist 🎨 on Fridays_

*Working 4 days a week opens up quite a bit of opportunities to explore new things 🌱. With no one around to sidetrack you, it gives you the free time you need—with no valid excuses to not try 🚀. Science and Art are fun 😂 ❤️. *

---

# VibeCoding1 Art Gallery

Live Gallery: [https://olivier-jaubert.github.io/VibeCoding1/](https://olivier-jaubert.github.io/VibeCoding1/)

## Features

- Modern web gallery displaying images from your collection
- Profile section with artist bio and quote
- Elegant, responsive layout with diagonal split background
- Click any image to view a zoomed modal preview
- Save the gallery as PDF or JPG with one click
- AI-powered image enhancement (DeepAI SRGAN):
  - Click an image, then click "Enhance Image" in the modal to upscale it
  - Enhanced images are shown in a separate section
  - Download enhanced images for permanent storage
- Enhanced images in `src/assets/enhanced_images/` are auto-displayed on reload

## How to Use

1. **View the gallery:** [https://olivier-jaubert.github.io/VibeCoding1/](https://olivier-jaubert.github.io/VibeCoding1/)
2. **Enhance images:** Click an image, then click "Enhance Image" in the modal
3. **Save enhanced images:** Use the download button under each enhanced image, then move it to `src/assets/enhanced_images/` for persistence
4. **Export gallery:** Use the top buttons to save the gallery as PDF or image

---

This project is a modern web gallery built with Vite + React. It is designed to display images from a local folder in a visually appealing, responsive format.

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Adding Your Photos
- Place your `.jpg` images in the `src/assets` folder (subfolders are supported, but `annex` is reserved for artist info).
- The gallery will automatically display all images in this folder.

## License
MIT
