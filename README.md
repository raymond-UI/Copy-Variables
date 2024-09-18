# Copy Variables Plugin

## Overview

The Copy Variables Plugin for Figma allows users to copy and paste variable collections between different Figma files. This can be particularly useful for maintaining consistency across multiple projects or for sharing variable collections with team members.

## How It Works

### Code.ts

The `code.ts` file contains the main logic for the plugin. It handles communication between the Figma environment and the plugin's user interface.

- **Initialization**: The plugin UI is displayed using `figma.showUI`.
- **Message Handling**: The plugin listens for messages from the UI and performs actions based on the message type:
    - `get-collections`: Fetches all local variable collections and sends them to the UI.
    - `check-saved-collection`: Checks if there is a saved collection in the user's client storage.
    - `copy-collection`: Copies the selected collection and saves it to the user's client storage.
    - `paste-collection`: Pastes the saved collection into the current Figma file.

### UI.html

The `ui.html` file defines the user interface for the plugin. It includes a dropdown to select a collection, and buttons to copy and paste collections.

- **Styles**: The UI is styled to match Figma's light and dark themes.
- **Elements**:
    - A dropdown (`select`) to list available collections.
    - Buttons (`button`) to copy and paste collections.
    - A status message (`p`) to display feedback to the user.
- **Scripts**:
    - Sends messages to the plugin to request collections and check for saved collections on load.
    - Handles user interactions such as selecting a collection and clicking the copy/paste buttons.
    - Receives messages from the plugin and updates the UI accordingly.

## Usage

1. **Open the Plugin**: Run the plugin in your Figma file.
2. **Select a Collection**: Choose a variable collection from the dropdown.
3. **Copy the Collection**: Click the "Copy Collection" button to copy the selected collection.
4. **Paste the Collection**: Click the "Paste Collection" button to paste the copied collection into the current Figma file.

## Conclusion

The Copy Variables Plugin simplifies the process of managing variable collections in Figma, making it easy to copy and paste collections across different files and projects.