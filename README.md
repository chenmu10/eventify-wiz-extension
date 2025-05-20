# EventifyWiz - Text to Calendar Chrome Extension

![UI](/src/assets/img/eventify-wiz-extension-UI.png)
![UI](/src/assets/img/eventify-wiz-extension-flow.png)

## Purpose

EventifyWiz is a Chrome extension designed to streamline the process of creating Google Calendar events directly from web page content. Its primary goal is to:

1.  **Extract text:** Allow users to easily select and capture relevant text containing event information from any active web page.
2.  **Parse with AI:** Utilize the ChatGPT API to intelligently parse the extracted text, identifying key event details such as the event title, date, time, location, and description.
3.  **Create Calendar Events:** Enable users to quickly and seamlessly create new events in their Google Calendar using the parsed information, minimizing manual data entry.

## Architecture

The extension is built using modern web technologies to provide a robust and user-friendly experience:

*   **User Interface (UI):** The extension's popup and any option pages are built with **React (v18)**, ensuring a dynamic and responsive user experience.
*   **Content Scripts:** These JavaScript files run in the context of web pages. They are responsible for accessing the Document Object Model (DOM) of the active page to extract user-selected text and interact with the page content.
*   **Background Scripts:** This is the central nervous system of the extension. It manages the overall state, handles communication between different parts of the extension (e.g., content scripts, popup UI), and orchestrates interactions with external services. This includes making requests to the ChatGPT API for text processing and the Google Calendar API for event creation.
*   **Service Integration:**
    *   **OpenAI API (ChatGPT):** Leveraged for its natural language processing capabilities to parse unstructured text into structured event data.
    *   **Google Calendar API:** Used to authenticate the user and create events directly in their Google Calendar.
*   **Build Process:** **Webpack 5** is used to bundle the JavaScript, CSS, and other assets. It's configured with **Webpack Dev Server 4**, **React Refresh**, and **react-refresh-webpack-plugin** for an efficient development workflow.
*   **Language & Formatting:** The project uses **TypeScript** for enhanced code quality and maintainability, along with **ESLint (eslint-config-react-app)** and **Prettier** for consistent code styling.
*   **Manifest Version:** The extension adheres to **Chrome Extension Manifest V3**.

This architecture promotes a separation of concerns, making the extension modular, easier to debug, and more maintainable. The boilerplate for this project was based on [lxieyang/chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react).

## Understanding `manifest.json`

The `src/manifest.json` file is the heart of the Chrome extension, defining its capabilities, permissions, and core functionalities. Here's a breakdown of its key components in EventifyWiz:

*   **`manifest_version": 3`**: Specifies that the extension uses Manifest V3, the latest version of the Chrome extension platform.
*   **`name`, `description`, `icons`**: These fields define the extension's name as it appears in the Chrome Web Store and browser, a brief description of its purpose, and the icons used in different parts of the browser UI.
*   **`action`**:
    *   `"default_title": "Events From Text"`: The tooltip text that appears when a user hovers over the extension icon.
    *   `"default_popup": "popup.html"`: Specifies that `popup.html` (bundled by Webpack, likely containing the React app) should be shown when the user clicks the extension icon.
*   **`content_scripts`**: This is crucial for interacting with web pages.
    *   `"matches": ["http://*/*", "https://*/*", "<all_urls>"]`: Allows the content script to be injected into virtually any web page the user visits.
    *   `"js": ["contentScript.bundle.js"]`: The JavaScript file (output by Webpack) that will be injected into matching pages. This script handles tasks like capturing selected text.
    *   `"css": ["content.styles.css"]`: CSS files to be injected, styling any UI elements the content script might add to the page.
*   **`oauth2`**: Defines the OAuth 2.0 configuration needed for Google Calendar integration.
    *   `"client_id": "%GOOGLE_CLIENT_ID%"`: **This is a placeholder.** It must be replaced with your actual Google Cloud Project's OAuth 2.0 Client ID for the Google Calendar API to work. This replacement is typically handled during the build process or manual setup.
    *   `"scopes": ["https://www.googleapis.com/auth/calendar.events"]`: Specifies the permission scope the extension requests. In this case, it asks for permission to create and manage events in the user's Google Calendar.
*   **`permissions`**:
    *   `"identity"`: This permission is essential for using the `chrome.identity` API. The extension uses this API to obtain an OAuth2 access token, allowing it to make authenticated requests to the Google Calendar API on behalf of the user.
*   **`key": "%GOOGLE_EXTENSION_KEY%"`**: **This is a placeholder.** It's used to ensure a consistent extension ID, especially during development across different machines or when publishing updates. This should be replaced with a unique key generated for your extension.

The `manifest.json` file is thus critical for declaring the extension's requirements and how it integrates with both the browser and external services like Google Calendar. The placeholders for `GOOGLE_CLIENT_ID` and `GOOGLE_EXTENSION_KEY` are important to note, as they require actual values for the extension to be fully functional and publishable.

## Project Management with `package.json`

The `package.json` file is the cornerstone of this Node.js project, managing its metadata, dependencies, and the scripts needed for development and building the extension. Here's an overview of its key aspects:

*   **Metadata**:
    *   `"name": "eventify-wiz-chrome-extension-text-to-calendar"`: The project's identifier.
    *   `"version": "0.0.1"`: The current version of the extension.
    *   `"description": "A chrome extension for creating new google events directly from the web page using chatGPT."`: A concise summary of the extension's purpose.
    *   `"license": "MIT"`: Specifies the open-source license.
    *   `"repository"`: Contains information about the Git repository.

*   **`scripts`**: These are command-line shortcuts for performing common development tasks:
    *   `"build": "node utils/build.js"`: Executes the build script (likely using Webpack) to package the extension for production, creating optimized assets and placing them in the `build` directory.
    *   `"start": "node utils/webserver.js"`: Runs a development server (Webpack Dev Server) that typically enables features like hot module replacement for a smoother development experience.
    *   `"prettier": "prettier --loglevel warn --write \"src/**/*.{jsx,js}\"`: Formats the JavaScript and JSX files within the `src` directory using Prettier to ensure consistent code style.
    *   `"lint": "eslint --ext .ts,.tsx ."`: Lints all TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files in the project using ESLint to catch potential errors and enforce coding standards.

*   **`dependencies`**: These are essential libraries that the extension relies on at runtime:
    *   `"react": "^18.2.0"`: The core React library for building the user interface.
    *   `"react-dom": "^18.2.0"`: Provides DOM-specific methods for React.

*   **`devDependencies`**: This extensive list includes packages used during the development, testing, and build phases, but are not part of the final production bundle shipped to users. Key devDependencies include:
    *   **Build System (Webpack & related)**: `webpack`, `webpack-cli`, `webpack-dev-server`, `html-webpack-plugin`, `copy-webpack-plugin`, `clean-webpack-plugin`, various loaders (`ts-loader`, `css-loader`, `style-loader`, `babel-loader`, `file-loader`), `terser-webpack-plugin` (for minification), and `dotenv-webpack` (for environment variable management).
    *   **TypeScript**: `typescript` and type definitions like `@types/chrome`, `@types/react`, `@types/react-dom`.
    *   **Linting & Formatting**: `eslint`, `eslint-config-prettier`, `eslint-config-react-app`, various ESLint plugins, `prettier`, and `pretty-quick`.
    *   **Babel (JavaScript Transpiler)**: `@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `babel-loader` to transpile modern JavaScript and JSX into compatible versions.
    *   **Development Experience**: `@pmmmwh/react-refresh-webpack-plugin` and `react-refresh` for enabling hot reloading with React components.
    *   Others like `fs-extra`, `sass`, `sass-loader`, etc.

*   **`lint-staged`**: This configuration is often used with tools like Husky to automatically lint and format files that are staged for a Git commit, ensuring code quality before it's added to the repository.
    *   `"*.{tsx,ts}": ["eslint --fix", "prettier --write"]`: Specifies that for any `.tsx` or `.ts` files, ESLint should attempt to fix issues and Prettier should format them.

In summary, `package.json` is crucial for defining the project structure, managing its dependencies with `npm install`, and providing convenient scripts to streamline development workflows like building, serving,linting, and formatting the codebase.

## Content Script: Interacting with Web Pages (`src/pages/Content/`)

The content script, with its entry point typically at `src/pages/Content/index.js` (and any modules it uses, like the example `src/pages/Content/modules/print.js`), plays a vital role in the extension's ability to interact directly with the content of web pages visited by the user.

*   **Intended Role**:
    *   **Runs in Page Context**: Injected into web pages as specified by the `matches` field in `manifest.json`. It operates in an isolated JavaScript environment but has access to the page's DOM.
    *   **Text Extraction**: Its primary responsibility is to allow users to select text on a web page that contains event details.
    *   **Communication**: Once text is selected (e.g., through a user action like a context menu click or a keyboard shortcut), the content script is responsible for capturing this selected text and sending it to the background script (service worker) for processing. The background script then coordinates with services like ChatGPT.
    *   **User Interaction (Potential)**: It could also be responsible for adding minimal UI elements to the page, such as a custom context menu item (though context menus are often defined in the background script and require content script interaction to know what was selected).

*   **Current Status (`src/pages/Content/index.js` & `src/pages/Content/modules/print.js`)**:
    *   The current implementation of `src/pages/Content/index.js` is foundational. It successfully demonstrates that the content script is being loaded into web pages by logging messages to the console:
        ```javascript
        // src/pages/Content/index.js
        import { printLine } from './modules/print';

        console.log('Content script works!');
        console.log('Must reload extension for modifications to take effect.');

        printLine("Using the 'printLine' function from the Print Module");
        ```
    *   It also shows the use of imported modules, with `src/pages/Content/modules/print.js` providing a basic example function:
        ```javascript
        // src/pages/Content/modules/print.js
        export const printLine = (line) => {
          console.log('===> FROM THE PRINT MODULE:', line);
        };
        ```
    *   **Key Functionality Missing**: The core functionality – detecting user text selection, extracting the selected text from the DOM, and sending this text to the background script for event parsing – is **not yet implemented**. This is a critical next step in the development of EventifyWiz to enable its main feature. The current scripts only serve as placeholders and proof that the content script loading mechanism is working.

Future development will need to focus on building out the text selection and communication logic within these content scripts.

## Popup Interface: `src/pages/Popup/Popup.tsx`

The `Popup.tsx` component is the main user interface for the EventifyWiz extension. It's the window that appears when a user clicks on the extension's icon in the browser toolbar. This interface orchestrates the user's journey from inputting text to creating a Google Calendar event.

It's built using React and is composed of two primary sub-components: `ExtractForm.tsx` and `EventDetailsForm.tsx`.

*   **State Management in `Popup.tsx`**:
    *   `formData`: A React state object that holds the structured event details (summary, location, description, start date/time, end date/time). It's initialized with default values and gets updated after text extraction and when the user modifies details in the `EventDetailsForm`.

*   **Constituent Components**:

    1.  **`ExtractForm.tsx` (`src/components/ExtractForm.tsx`)**:
        *   **Purpose**: This is the initial point of interaction for the user within the popup. It provides a textarea where users can paste text containing event details. In future versions, this component could also be designed to receive text automatically from the content script (e.g., when text is selected on a webpage).
        *   **Functionality**:
            *   Manages its own state for the input text (`promptData`), loading status (`status`), and any errors (`error`).
            *   When the user types into the textarea, `promptData` is updated.
            *   Clicking the "Extract ✨" button triggers its `handleSubmit` function. This function calls `extractEventDetails(promptData)` (a service function in `src/services/chatgpt.ts` which is expected to interact with the ChatGPT API).
            *   After `extractEventDetails` returns the processed data, `ExtractForm` calls the `onExtractedData` callback prop (which is `handleExtractedData` in `Popup.tsx`), passing the structured event details.

    2.  **`EventDetailsForm.tsx` (`src/components/EventDetailsForm.tsx`)**:
        *   **Purpose**: This component displays the event details that were parsed from the input text (by ChatGPT, via `ExtractForm`). It allows users to review, edit, and confirm the event information before it's sent to Google Calendar.
        *   **Functionality**:
            *   Receives the `formData` (from `Popup.tsx`) as props to populate its input fields (event name, location, description, start/end dates and times).
            *   When the user modifies any field, it calls the `onHandleChange` callback prop (which is `handleChange` in `Popup.tsx`) to update the `formData` state in the parent `Popup.tsx` component.
            *   Clicking the "Create Google Calendar Event 🪄" button triggers the `onHandleSubmit` callback prop (which is `handleSubmit` in `Popup.tsx`).

*   **Data Flow**:

    1.  **Text Input**: The user pastes text into the textarea in `ExtractForm.tsx`.
    2.  **Extraction Trigger**: The user clicks "Extract ✨" in `ExtractForm`.
        *   `ExtractForm` calls `extractEventDetails` (from `chatgpt.ts`) with the input text.
        *   *(Currently, `extractEventDetails` in `ExtractForm.tsx` uses a hardcoded `eventDetails` object for demonstration if an API call fails or as a placeholder, but it's intended to make a call to the ChatGPT service. The actual API call is present but might be using dummy data or need API keys configured).*
    3.  **Populating `formData`**:
        *   The `onExtractedData` prop of `ExtractForm` (which is `handleExtractedData` in `Popup.tsx`) is called with the data returned by `extractEventDetails`.
        *   `handleExtractedData` in `Popup.tsx` updates its `formData` state with the received event details, parsing date and time components appropriately.
    4.  **Displaying in `EventDetailsForm`**:
        *   The `formData` state from `Popup.tsx` is passed as a prop to `EventDetailsForm.tsx`.
        *   `EventDetailsForm` renders its input fields using these `formData` values.
    5.  **User Edits**: If the user edits any details in `EventDetailsForm`, the `handleChange` function in `Popup.tsx` is triggered, updating the `formData` state in real-time.
    6.  **Event Creation Trigger**: The user clicks "Create Google Calendar Event 🪄" in `EventDetailsForm`.
        *   This calls `handleSubmit` in `Popup.tsx`.
        *   `handleSubmit` in `Popup.tsx` then calls `handleCreateEventClick(formData)` which is imported from `src/services/google-calendar.ts`.
    7.  **Google Calendar Interaction**:
        *   `handleCreateEventClick` in `google-calendar.ts` is responsible for obtaining an OAuth token (using `chrome.identity.getAuthToken`) and making the API request to the Google Calendar API to create the event with the details from `formData`.
        *   *(Note: The `handleCreateEventClick` function in the provided `google-calendar.ts` also currently uses a hardcoded `eventDetails` object before calling `createEvent`. This would need to be modified to use the `eventFormData` parameter it receives for actual dynamic event creation).*

This structured flow ensures that data moves from user input, through (simulated or actual) AI processing, to a review and edit stage, and finally to Google Calendar event creation, all orchestrated by `Popup.tsx`.

## AI-Powered Parsing: ChatGPT Service (`src/services/chatgpt.ts`)

The `src/services/chatgpt.ts` module is responsible for leveraging the OpenAI GPT models to parse unstructured text containing event details into a structured JSON format suitable for creating calendar events.

*   **Core Function: `async function extractEventDetails(eventData: string): Promise<any>`**

    *   **Purpose**: This function takes a raw string of text (`eventData`) that describes an event and sends it to the OpenAI API for interpretation.
    *   **Prompt Engineering**: It crafts a specific prompt to guide the AI:
        ```
        `extract event details in google calendar api json format from this text: ${eventData}`
        ```
        This prompt instructs the model to identify key event attributes (like summary, location, description, start and end times with timezones) and structure them as a JSON object that aligns with the Google Calendar API's requirements.
    *   **API Interaction**:
        *   It makes an asynchronous `fetch` request (HTTP POST) to the OpenAI API endpoint.
        *   **Endpoint URL**: The URL for this request is sourced from the environment variable `process.env.OPENAI_URL` (e.g., `https://api.openai.com/v1/completions`).
        *   **Authentication**: The request is authenticated using an API key passed in the `Authorization` header: `Bearer ${process.env.OPENAI_API_KEY}`. The key itself is expected to be available via `process.env.OPENAI_API_KEY`.
        *   **Request Body**: The body of the request specifies the parameters for the API call:
            *   `model: "text-davinci-003"`: Designates the specific OpenAI language model to use.
            *   `prompt`: The engineered prompt containing the user's text.
            *   `temperature: 0`: Set for more deterministic and focused output.
            *   `max_tokens: 100`: Limits the length of the generated response.
            *   Other parameters like `top_p`, `frequency_penalty`, `presence_penalty`, and `stop: ['\n']` are tuned to refine the AI's output for this specific task.
    *   **Response Handling**:
        *   The function first checks if the API response was successful (`response.ok`). If there's an error, it attempts to parse the error details from the JSON response and throws an error.
        *   If successful, it returns the entire JSON response from the OpenAI API. The caller (currently `ExtractForm.tsx`) is then responsible for further processing this response, which typically involves:
            1.  Accessing the main text content (e.g., `responseData.choices[0].text`).
            2.  This text content itself is expected to be a JSON string. Parsing this inner JSON string to get the structured event object (e.g., `{ summary: "...", location: "...", start: { dateTime: "...", timeZone: "..." }, ... }`).

*   **Required Environment Variables**:
    For this service to function, the following environment variables must be configured (typically in a `.env` file that is processed by `dotenv-webpack` during the build):
    *   `OPENAI_URL`: The complete URL for the OpenAI API endpoint (e.g., `https://api.openai.com/v1/completions`).
    *   `OPENAI_API_KEY`: Your secret API key provided by OpenAI.

*   **Security Considerations**:
    It is crucial to keep your `OPENAI_API_KEY` confidential. It should never be hardcoded directly into the source code or committed to version control. Using environment variables (and ensuring the `.env` file is in `.gitignore`) is the standard practice for managing such secrets.

This service is a key component of EventifyWiz, enabling the "intelligent" part of parsing event text.

## Google Calendar Integration (`src/services/google-calendar.ts`)

The `src/services/google-calendar.ts` module is dedicated to interacting with the Google Calendar API, primarily to create new calendar events based on the details processed by the extension.

*   **Key Functions**:

    1.  **`async function handleCreateEventClick(eventFormData: EventFormData)`**:
        *   **Intended Role**: This is the main public-facing function for this service, designed to be called from the user interface (e.g., `Popup.tsx`) after the user has finalized event details. It should take the `eventFormData` (an object conforming to the `EventFormData` type, containing summary, location, dates, times, etc.) and prepare it for event creation.
        *   **🚨 Critical Flaw & Current Behavior**: As of the current implementation, this function **does not use the `eventFormData` parameter it receives**. Instead, it hardcodes an `eventDetails` object:
            ```typescript
            let eventDetails = {
              summary: 'lunch with Tina',
              location: 'Tel Aviv',
              start: { /* ... */ },
              end: { /* ... */ },
              description: 'we should discuss the project.',
            };
            ```
            It then calls `createEvent(eventDetails)` with this static, hardcoded data. This means that **the extension will always attempt to create the "lunch with Tina" event, irrespective of any text extracted or user modifications in the popup.** This is a major bug that prevents the extension from functioning as intended and requires immediate correction. The function must be refactored to dynamically construct the `eventDetails` object based on the `eventFormData` input.

    2.  **`async function createEvent(eventDetails: EventDetails)`**:
        *   **Purpose**: This internal function handles the direct communication with the Google Calendar API to create an event.
        *   **Authentication using `chrome.identity.getAuthToken`**:
            *   The function first calls `chrome.identity.getAuthToken({ interactive: true }, callback)`. This is a core Chrome API method for obtaining an OAuth 2.0 access token.
            *   `interactive: true` ensures that if the extension doesn't have a valid token or if the user hasn't granted permission, Chrome will facilitate a user interaction flow (e.g., login, consent screen).
            *   This is a secure way to get authorization to act on the user's behalf without the extension ever handling or storing sensitive credentials.
            *   Successful execution of this depends on the `"identity"` permission and the appropriate Google Calendar API scope (e.g., `"https://www.googleapis.com/auth/calendar.events"`) being declared in the `manifest.json` file's `oauth2` section.
        *   **API Request**:
            *   Once a `token` is acquired, the function makes an asynchronous `fetch` call (HTTP POST) to the Google Calendar API.
            *   **Endpoint URL**: The target URL is provided by the `process.env.CALENDAR_URL` environment variable (e.g., `https://www.googleapis.com/calendar/v3/calendars/primary/events` to add to the user's primary calendar).
            *   **Headers**: The request includes `Authorization: 'Bearer ' + token` to authenticate with the token, and `Content-Type: 'application/json'`.
            *   **Body**: The `eventDetails` object (currently, the hardcoded one from `handleCreateEventClick`) is stringified and sent as the request body.
        *   **Response Handling**:
            *   It checks if the `response.ok`. If not, it attempts to parse error information from the response and throws an error.
            *   On success, it currently uses `alert(JSON.stringify(data))` to display the API's response data. For a production extension, this should be replaced with more user-friendly feedback (e.g., a success message or opening the created event).

*   **Required Environment Variable**:
    *   `CALENDAR_URL`: The full URL for the Google Calendar API endpoint for creating events. For example: `https://www.googleapis.com/calendar/v3/calendars/primary/events`.

*   **Permissions Dependency**:
    The functionality of this service heavily relies on the permissions and OAuth scopes defined in `manifest.json`. Specifically, the `"identity"` permission and the `"https://www.googleapis.com/auth/calendar.events"` scope under `oauth2.scopes` are essential for `chrome.identity.getAuthToken` to work and for the API requests to be authorized.

This service is critical for the final step of the extension's workflow. Addressing the hardcoding issue in `handleCreateEventClick` is paramount for the extension's usability.

## Current State & Functionality Summary

This section provides an overview of the EventifyWiz extension's intended workflow versus its actual current functionality, highlighting key areas that are operational, partially implemented, or require significant development.

**1. Intended Workflow:**

The envisioned process for a user is:

1.  **Text Selection**: User selects text containing event details on any webpage.
2.  **Content Script Activation**: The Content Script (`src/pages/Content/index.js`) captures this selected text.
3.  **Data Transfer to Popup**: The captured text is sent to the extension's popup.
4.  **Initial Display in Popup**: The `ExtractForm.tsx` component within the popup displays this text.
5.  **AI Parsing**: User clicks "Extract ✨", sending the text to the `src/services/chatgpt.ts` service, which queries the OpenAI API to parse it into structured event data (summary, date, time, location, etc.).
6.  **Populate Event Form**: The structured data returned from ChatGPT populates the fields in the `EventDetailsForm.tsx` component in the popup.
7.  **User Review & Edit**: User reviews the auto-filled details, makes any necessary corrections or additions.
8.  **Calendar Event Creation**: User clicks "Create Google Calendar Event 🪄", triggering the `src/services/google-calendar.ts` service to create an event in the user's Google Calendar with these details.

**2. Actual Current Workflow & Discrepancies:**

*   **Content Script (`src/pages/Content/index.js`) - Not Implemented**:
    *   The content script is currently a basic placeholder. It **does not have the functionality to detect or extract user-selected text** from web pages. It only logs messages to the console, confirming it loads.
    *   **Impact**: The primary method of getting event text into the extension (automatic selection from a webpage) is missing.

*   **Popup Text Input (`src/components/ExtractForm.tsx`) - Manual Input Required**:
    *   Since the content script doesn't send any text, the `ExtractForm.tsx` component in the popup relies entirely on **manual user input**. The user must copy text from a webpage and paste it into the textarea provided in the popup.

*   **ChatGPT Service Integration (`src/services/chatgpt.ts`) - Partially Operational (Requires Configuration)**:
    *   The `ExtractForm.tsx` is wired to call the `extractEventDetails` function in `chatgpt.ts` with the manually pasted text.
    *   This service *can* communicate with the OpenAI API, but it **requires valid `OPENAI_URL` and `OPENAI_API_KEY` environment variables** to be correctly set up. Without these, the API call will fail.
    *   The prompt engineering to get structured JSON is in place.

*   **Event Details Form (`src/components/EventDetailsForm.tsx`) - Functional for Display and Edit**:
    *   If the ChatGPT service successfully returns structured data (or if the placeholder data in `ExtractForm.tsx` is used), the `EventDetailsForm.tsx` correctly populates with this data.
    *   Users can edit the fields, and these changes are correctly reflected in the `Popup.tsx` component's state.

*   **Google Calendar Service (`src/services/google-calendar.ts`) - Critically Flawed**:
    *   When the user submits the `EventDetailsForm` to create an event, the `handleCreateEventClick` function in `google-calendar.ts` is called with the (potentially edited) form data.
    *   **Major Issue**: This function **ignores the incoming form data**. It uses a **hardcoded "lunch with Tina" event object** for creating the calendar event.
    *   **Impact**: Regardless of the text pasted, ChatGPT's output, or user edits, the extension will **always attempt to create the same, static "lunch with Tina" event**. Dynamic event creation based on user data is broken.
    *   The authentication part using `chrome.identity.getAuthToken` is implemented and should work, provided the necessary OAuth client ID is configured in `manifest.json`.

**In Summary:**

EventifyWiz has a foundational UI structure within its popup for manual text input, displaying parsed data, and user edits. The connection to the ChatGPT API is implemented but needs correct API key configuration. However, two core pieces of functionality are either missing or critically flawed:

1.  **Automated text extraction from web pages via the content script is not implemented.**
2.  **Dynamic Google Calendar event creation is broken due to hardcoded data in the `google-calendar.ts` service.**

To make the extension functional as intended, these two areas require the most urgent development focus. Other considerations include robust error handling and user feedback mechanisms.

## Future Development & Bug Fixing

To bring EventifyWiz to its full potential and address current limitations, the following areas require attention:

1.  **Implement Content Script Text Selection & Extraction**:
    *   **File**: `src/pages/Content/index.js`
    *   **Task**: Currently, this script is a placeholder. It needs to be developed to:
        *   Detect user text selection on web pages (e.g., using `window.getSelection().toString()`).
        *   Provide a mechanism for the user to trigger the extraction (e.g., via a context menu item added by the extension, or a keyboard shortcut).
        *   Extract the selected text.

2.  **Establish Content Script to Popup/Background Communication**:
    *   **Task**: Once text is selected by the content script, a robust communication channel needs to be established to send this text to the popup UI (specifically, to populate `ExtractForm.tsx`). This typically involves:
        *   Content script sending a message using `chrome.runtime.sendMessage()`.
        *   A background script (service worker, not explicitly detailed yet but standard for extensions) listening via `chrome.runtime.onMessage.addListener()` and potentially relaying the message to the popup if it's open, or storing it temporarily.
        *   Alternatively, if the popup is already open, the content script might be able to send a message directly, or the popup could request it. The exact mechanism needs design based on desired user experience (e.g., does selection open the popup, or does the user select then open popup?).

3.  **Fix Dynamic Event Creation in `google-calendar.ts`**:
    *   **File**: `src/services/google-calendar.ts`
    *   **Function**: `handleCreateEventClick(eventFormData: EventFormData)`
    *   **Task**: This is a **critical bug fix**. The function currently ignores the `eventFormData` parameter and uses hardcoded event details.
        *   It **must be modified** to dynamically create the `eventDetails` object (the one passed to `createEvent`) based on the properties of the `eventFormData` received from `Popup.tsx`. This involves mapping fields like `eventFormData.summary` to `eventDetails.summary`, `eventFormData.startDate` and `eventFormData.startTime` to `eventDetails.start.dateTime`, etc., ensuring correct ISO 8601 formatting for dates/times and inclusion of time zones.

4.  **Comprehensive Environment Variable Management & Documentation**:
    *   **Task**: Ensure all environment variables and build-time placeholders are clearly documented and easy for developers to set up.
    *   **Variables to Document**:
        *   `OPENAI_URL`: OpenAI API endpoint.
        *   `OPENAI_API_KEY`: OpenAI secret key.
        *   `CALENDAR_URL`: Google Calendar API endpoint.
        *   `GOOGLE_CLIENT_ID` (placeholder in `manifest.json`): OAuth 2.0 Client ID from Google Cloud Console.
        *   `GOOGLE_EXTENSION_KEY` (placeholder in `manifest.json`): Fixed extension key for development.
    *   **Process**:
        *   Provide a template file (e.g., `.env.example`).
        *   Clear instructions on how to create a `.env` file from the template and where to obtain each value.
        *   Explain how these variables are loaded during the build process (e.g., via `dotenv-webpack`).

5.  **Improve Error Handling & User Feedback**:
    *   **Task**: Enhance the robustness of the extension by implementing better error handling and providing more informative feedback to the user.
    *   **Examples**:
        *   Instead of `alert(JSON.stringify(data))` for API successes/errors, use dedicated UI elements within the popup to display clear success messages (e.g., "Event created successfully!") or user-friendly error messages (e.g., "Failed to connect to OpenAI. Check your API key and internet connection.").
        *   Implement more specific error catching for API calls (e.g., distinguishing network errors from API authentication errors or rate limit errors).
        *   Provide visual cues for loading states during API interactions (e.g., disabling buttons, showing spinners – some of this is present in `ExtractForm.tsx` but can be standardized).

Addressing these points will significantly improve the functionality, reliability, and user experience of the EventifyWiz extension.

## Tech Stack Summary

*   **Core:** React 18, TypeScript, Chrome Extension Manifest V3
*   **APIs:** OpenAI API, Google Calendar API
*   **Build Tools:** Webpack 5, Webpack Dev Server 4
*   **Development Experience:** React Refresh, eslint-config-react-app, Prettier

## Installing and Running

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
