# This script assigns all issues with a given title (or partial title match) to github-copilot[bot]
# Usage: .\assign-copilot-issues.ps1 "partial or full issue title"

# Add new issues for refactoring and reusable components
$newIssues = @(
    @{ title = "3. Create reusable ImageCard component for gallery items"; body = "Abstract the image rendering logic in the gallery into a reusable ImageCard React component. Replace all direct image rendering in the gallery with this new component."; category = "copilot" },
    @{ title = "4. Extract modal/lightbox logic into a Modal component"; body = "Move the modal or lightbox logic from the gallery into a standalone Modal React component. Ensure it supports image viewing, navigation, and keyboard controls."; category = "copilot" },
    @{ title = "5. Create a standalone Header component for branding/navigation"; body = "Design and implement a Header React component for site branding and navigation. Replace any inline or duplicated header code with this component."; category = "copilot" },
    @{ title = "6. Refactor gallery layout logic into a GalleryGrid component"; body = "Encapsulate the gallery layout logic (including any grid or masonry layout) into a GalleryGrid React component for better maintainability and reuse."; category = "copilot" },
    @{ title = "7. Move common styles to shared CSS modules or a theme file"; body = "Identify and move repeated or common CSS styles into shared CSS modules or a theme file to ensure consistency and easier maintenance."; category = "copilot" },
    @{ title = "8. Document new components and their usage"; body = "Write documentation for each new or refactored component, including props, usage examples, and any design decisions. Place documentation in a README or as code comments."; category = "copilot" }
)

$repo = "olivier-jaubert/VibeCoding1"

# Assign github-copilot[bot] to every issue in $newIssues with category 'copilot'
# Get all open issues from GitHub
$issues = gh issue list --repo $repo --state open --json number,title | ConvertFrom-Json

foreach ($newIssue in $newIssues) {
    if ($newIssue.category -eq "copilot") {
        $match = $issues | Where-Object { $_.title -eq $newIssue.title }
        if ($match) {
            Write-Host "Assigning issue #$($match.number): $($newIssue.title) to github-copilot[bot]"
            gh issue edit $match.number --repo $repo --add-assignee github-copilot[bot]
        } else {
            Write-Host "No open issue found with title: $($newIssue.title)"
        }
    }
}
