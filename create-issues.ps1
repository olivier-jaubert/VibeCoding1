
# Add new issues for refactoring and reusable components
$newIssues = @(
    @{ title = "3. Create reusable ImageCard component for gallery items"; body = "Abstract the image rendering logic in the gallery into a reusable ImageCard React component. Replace all direct image rendering in the gallery with this new component."; category = "copilot" },
    @{ title = "4. Extract modal/lightbox logic into a Modal component"; body = "Move the modal or lightbox logic from the gallery into a standalone Modal React component. Ensure it supports image viewing, navigation, and keyboard controls."; category = "copilot" },
    @{ title = "5. Create a standalone Header component for branding/navigation"; body = "Design and implement a Header React component for site branding and navigation. Replace any inline or duplicated header code with this component."; category = "copilot" },
    @{ title = "6. Refactor gallery layout logic into a GalleryGrid component"; body = "Encapsulate the gallery layout logic (including any grid or masonry layout) into a GalleryGrid React component for better maintainability and reuse."; category = "copilot" },
    @{ title = "7. Move common styles to shared CSS modules or a theme file"; body = "Identify and move repeated or common CSS styles into shared CSS modules or a theme file to ensure consistency and easier maintenance."; category = "copilot" },
    @{ title = "8. Document new components and their usage"; body = "Write documentation for each new or refactored component, including props, usage examples, and any design decisions. Place documentation in a README or as code comments."; category = "copilot" }
)

# Create new issues
foreach ($issue in $newIssues) {
    $label = $issue.category
    gh issue create --repo $repo --title $issue.title --body $issue.body --label $label
}
# Edit existing issues to add labels and update content and correct issue number allocated after adding new issues
$existingIssues  = @(
    @{ number = 1; title = "1. Set up a new branch for the redesign"; body = "Create a new git branch dedicated to the website redesign and modernization. Ensure all future changes for the new gallery are committed to this branch."; category = "manual" },
    @{ number = 2; title = "2. Audit current codebase and identify reusable components"; body = "Review the existing codebase to identify which components, styles, and logic can be reused or need to be refactored for the new gallery setup. Document findings and recommendations."; category = "copilot" },
    @{ number = 3; title = "3. Register app in Google Cloud Console and obtain OAuth2 credentials"; body = "Go to the Google Cloud Console, create a new project, enable the Google Photos Library API, and set up OAuth2 credentials for web application access. Document the client ID and secret securely."; category = "manual" },
    @{ number = 4; title = "4. Implement OAuth2 authentication flow in React"; body = "Integrate OAuth2 authentication in the React app to allow users to sign in with their Google account. Handle login, logout, and token management securely."; category = "copilot" },
    @{ number = 5; title = "5. Integrate Google Photos Library API to fetch user images"; body = "Use the authenticated user's token to fetch images from their Google Photos account using the Google Photos Library API. Display the images in the gallery UI."; category = "copilot" },
    @{ number = 6; title = "6. Store and manage authentication state securely"; body = "Implement secure storage and management of authentication state (tokens, user info) using React Context or a similar state management solution. Ensure sensitive data is not exposed."; category = "copilot" },
    @{ number = 7; title = "7. Install and configure a responsive gallery layout (e.g., react-masonry-css)"; body = "Add a modern, responsive gallery layout library such as react-masonry-css. Configure it to display images in a visually appealing, masonry-style grid that adapts to screen size."; category = "copilot" },
    @{ number = 8; title = "8. Implement lazy loading for images"; body = "Optimize gallery performance by implementing lazy loading for images. Ensure images load only as they enter the viewport, reducing initial load time and bandwidth usage."; category = "copilot" },
    @{ number = 9; title = "9. Add a modern lightbox/modal for image viewing"; body = "Integrate a polished lightbox or modal component (e.g., react-image-lightbox) to allow users to view images in detail, with navigation and keyboard support."; category = "copilot" },
    @{ number = 10; title = "10. Add a header with branding and navigation"; body = "Design and implement a header component that includes site branding (logo, title) and navigation links as needed. Ensure it is responsive and visually consistent."; category = "copilot" },
    @{ number = 11; title = "11. Apply a modern font and consistent color palette"; body = "Update the site's typography to use a modern, web-friendly font (e.g., Inter, Roboto) and apply a consistent color palette throughout the UI for a professional look."; category = "copilot" },
    @{ number = 12; title = "12. Add hover effects, spacing, and card-like containers for images"; body = "Enhance the gallery UI with subtle hover effects, appropriate spacing, and card-style containers for images to improve visual appeal and interactivity."; category = "copilot" },
    @{ number = 13; title = "13. Ensure accessibility (alt text, keyboard navigation, ARIA attributes)"; body = "Review and update the gallery for accessibility: add descriptive alt text to images, ensure all interactive elements are keyboard accessible, and use ARIA attributes where appropriate."; category = "copilot" },
    @{ number = 14; title = "14. Refactor UI into reusable React components"; body = "Break down the UI into modular, reusable React components (e.g., Gallery, ImageCard, Header, Modal) to improve maintainability and scalability."; category = "copilot" },
    @{ number = 15; title = "15. Use React hooks for state management"; body = "Refactor stateful logic to use React hooks (useState, useEffect, useContext, etc.) for cleaner and more modern state management."; category = "copilot" },
    @{ number = 16; title = "16. Test authentication and image loading flows"; body = "Test the full authentication process and image loading from Google Photos to ensure reliability and a smooth user experience. Fix any bugs or edge cases found."; category = "copilot" },
    @{ number = 17; title = "17. Optimize for mobile and desktop responsiveness"; body = "Ensure the gallery layout and all UI components are fully responsive, providing a seamless experience on both mobile and desktop devices."; category = "copilot" },
    @{ number = 18; title = "18. Audit and improve performance (lazy loading, image sizes)"; body = "Analyze the site's performance, focusing on image loading, bundle size, and rendering speed. Implement optimizations such as image compression and code splitting as needed."; category = "copilot" },
    @{ number = 19; title = "19. Set up environment variables for API keys/secrets"; body = "Configure environment variables to securely store API keys and secrets. Update the codebase to reference these variables instead of hardcoding sensitive information."; category = "manual" },
    @{ number = 20; title = "20. Deploy the site to Vercel or Netlify"; body = "Prepare the site for production deployment and deploy it to a modern hosting platform such as Vercel or Netlify. Verify that all features work as expected in the deployed environment."; category = "manual" }
)

$repo = "olivier-jaubert/VibeCoding1"

# Edit existing issues
foreach ($issue in $existingIssues) {
    $label = $issue.category
    gh issue edit $issue.number --repo $repo --title $issue.title --body $issue.body --add-label $label
}


