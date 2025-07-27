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

- **AI-powered image editor**
> ⚠️ **Warning:** Not working at the moment. Trying to call DeepAI API 
  - Click an image, then click "AI Editor" and input text prompt 
  - Enhanced images are shown in a separate section
  - Download enhanced images for permanent storage
- Enhanced images in `src/assets/enhanced_images/` are auto-displayed on reload

## How to Use

1. **View the gallery:** [https://olivier-jaubert.github.io/VibeCoding1/](https://olivier-jaubert.github.io/VibeCoding1/)
2. **Edit images:** Click an image, then click "AI Editor" in the modal
3. **Save enhanced images:** Use the download button under each enhanced image, then move it to `src/assets/enhanced_images/` for persistence
4. **Export gallery:** Use the top buttons to save the gallery as PDF or image

---

## Setting up your DeepAI API Key

This project uses the DeepAI Photo Editor API for image enhancement. To use this feature, you must provide your own DeepAI API key.

### Steps:
1. **Create a free DeepAI account:**
   - Go to [DeepAI Sign Up](https://deepai.org/signup) and create an account.
2. **Get your API key:**
   - After logging in, visit your [API Keys page](https://deepai.org/dashboard/profile) to copy your key.
3. **Add your API key to the project:**
   - In the project root, create a file named `.env` (if it doesn't exist).
   - Add the following line to `.env`:
     
     ```env
     VITE_DEEPAI_API_KEY=your-api-key-here
     ```
   - Replace `your-api-key-here` with your actual DeepAI API key.
4. **Restart the development server** if it's running, so the new environment variable is loaded.

**Note:** The `.env` file is ignored by git and will not be committed to the repository.

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


---

## Components & Usage

### ImageCard
Reusable card for displaying gallery images.

**Props:**
- `src` (string, required): Image source URL
- `alt` (string, required): Alt text
- `onClick` (function, optional): Click handler
- `className` (string, optional): Additional class names

**Usage:**
```jsx
<ImageCard src="img.jpg" alt="Artwork" onClick={() => openModal("img.jpg")} />
```

### Modal
Reusable modal/lightbox overlay for displaying content.

**Props:**
- `isOpen` (bool): Whether the modal is open
- `onClose` (function): Close handler
- `children` (node): Content to display
- `onPrev`/`onNext` (function, optional): Navigation handlers
- `showNav` (bool, optional): Show navigation arrows

**Usage:**
```jsx
<Modal isOpen={modalOpen} onClose={closeModal} showNav onPrev={prevImg} onNext={nextImg}>
  <img src={selectedImg} alt="" />
</Modal>
```

### Header
Site branding and navigation bar.

**Usage:**
```jsx
<Header />
```

### GalleryGrid
Displays a grid of images with optional favorite and enhance actions.

**Props:**
- `images` (array): List of image URLs
- `favorites` (array): List of favorite image URLs
- `onImageClick` (function): Handler for image click
- `onToggleFavorite` (function): Handler to toggle favorite status
- `showFavorites` (bool): Show only favorites
- `selectedImg` (string): Currently selected image
- `isEnhancing` (bool): Whether an image is being enhanced
- `handleEnhanceImage` (function): Handler to enhance image

**Usage:**
```jsx
<GalleryGrid images={images} onImageClick={setSelectedImg} favorites={favorites} onToggleFavorite={toggleFavorite} />
```

---

Each component is documented with JSDoc comments in its source file for further details.
