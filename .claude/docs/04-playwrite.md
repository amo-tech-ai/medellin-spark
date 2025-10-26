> npx @playwright/mcp@latest --help
  --allowed-hosts <hosts...>            comma-separated list of hosts this
                                        server is allowed to serve from.
                                        Defaults to the host the server is bound
                                        to. Pass '*' to disable the host check.
  --allowed-origins <origins>           semicolon-separated list of origins to
                                        allow the browser to request. Default is
                                        to allow all.
  --blocked-origins <origins>           semicolon-separated list of origins to
                                        block the browser from requesting.
                                        Blocklist is evaluated before allowlist.
                                        If used without the allowlist, requests
                                        not matching the blocklist are still
                                        allowed.
  --block-service-workers               block service workers
  --browser <browser>                   browser or chrome channel to use,
                                        possible values: chrome, firefox,
                                        webkit, msedge.
  --caps <caps>                         comma-separated list of additional
                                        capabilities to enable, possible values:
                                        vision, pdf.
  --cdp-endpoint <endpoint>             CDP endpoint to connect to.
  --cdp-header <headers...>             CDP headers to send with the connect
                                        request, multiple can be specified.
  --config <path>                       path to the configuration file.
  --device <device>                     device to emulate, for example: "iPhone
                                        15"
  --executable-path <path>              path to the browser executable.
  --extension                           Connect to a running browser instance
                                        (Edge/Chrome only). Requires the
                                        "Playwright MCP Bridge" browser
                                        extension to be installed.
  --grant-permissions <permissions...>  List of permissions to grant to the
                                        browser context, for example
                                        "geolocation", "clipboard-read",
                                        "clipboard-write".
  --headless                            run browser in headless mode, headed by
                                        default
  --host <host>                         host to bind server to. Default is
                                        localhost. Use 0.0.0.0 to bind to all
                                        interfaces.
  --ignore-https-errors                 ignore https errors
  --init-script <path...>               path to JavaScript file to add as an
                                        initialization script. The script will
                                        be evaluated in every page before any of
                                        the page's scripts. Can be specified
                                        multiple times.
  --isolated                            keep the browser profile in memory, do
                                        not save it to disk.
  --image-responses <mode>              whether to send image responses to the
                                        client. Can be "allow" or "omit",
                                        Defaults to "allow".
  --no-sandbox                          disable the sandbox for all process
                                        types that are normally sandboxed.
  --output-dir <path>                   path to the directory for output files.
  --port <port>                         port to listen on for SSE transport.
  --proxy-bypass <bypass>               comma-separated domains to bypass proxy,
                                        for example
                                        ".com,chromium.org,.domain.com"
  --proxy-server <proxy>                specify proxy server, for example
                                        "http://myproxy:3128" or
                                        "socks5://myproxy:8080"
  --save-session                        Whether to save the Playwright MCP
                                        session into the output directory.
  --save-trace                          Whether to save the Playwright Trace of
                                        the session into the output directory.
  --save-video <size>                   Whether to save the video of the session
                                        into the output directory. For example
                                        "--save-video=800x600"
  --secrets <path>                      path to a file containing secrets in the
                                        dotenv format
  --shared-browser-context              reuse the same browser context between
                                        all connected HTTP clients.
  --storage-state <path>                path to the storage state file for
                                        isolated sessions.
  --test-id-attribute <attribute>       specify the attribute to use for test
                                        ids, defaults to "data-testid"
  --timeout-action <timeout>            specify action timeout in milliseconds,
                                        defaults to 5000ms
  --timeout-navigation <timeout>        specify navigation timeout in
                                        milliseconds, defaults to 60000ms
  --user-agent <ua string>              specify user agent string
  --user-data-dir <path>                path to the user data directory. If not
                                        specified, a temporary directory will be
                                        created.
  --viewport-size <size>                specify browser viewport size in pixels,
                                        for example "1280x720"

Core automation
browser_click
Title: Click
Description: Perform click on a web page
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
ref (string): Exact target element reference from the page snapshot
doubleClick (boolean, optional): Whether to perform a double click instead of a single click
button (string, optional): Button to click, defaults to left
modifiers (array, optional): Modifier keys to press
Read-only: false
browser_close
Title: Close browser
Description: Close the page
Parameters: None
Read-only: false
browser_console_messages
Title: Get console messages
Description: Returns all console messages
Parameters:
onlyErrors (boolean, optional): Only return error messages
Read-only: true
browser_drag
Title: Drag mouse
Description: Perform drag and drop between two elements
Parameters:
startElement (string): Human-readable source element description used to obtain the permission to interact with the element
startRef (string): Exact source element reference from the page snapshot
endElement (string): Human-readable target element description used to obtain the permission to interact with the element
endRef (string): Exact target element reference from the page snapshot
Read-only: false
browser_evaluate
Title: Evaluate JavaScript
Description: Evaluate JavaScript expression on page or element
Parameters:
function (string): () => { /* code / } or (element) => { / code */ } when element is provided
element (string, optional): Human-readable element description used to obtain permission to interact with the element
ref (string, optional): Exact target element reference from the page snapshot
Read-only: false
browser_file_upload
Title: Upload files
Description: Upload one or multiple files
Parameters:
paths (array, optional): The absolute paths to the files to upload. Can be single file or multiple files. If omitted, file chooser is cancelled.
Read-only: false
browser_fill_form
Title: Fill form
Description: Fill multiple form fields
Parameters:
fields (array): Fields to fill in
Read-only: false
browser_handle_dialog
Title: Handle a dialog
Description: Handle a dialog
Parameters:
accept (boolean): Whether to accept the dialog.
promptText (string, optional): The text of the prompt in case of a prompt dialog.
Read-only: false
browser_hover
Title: Hover mouse
Description: Hover over element on page
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
ref (string): Exact target element reference from the page snapshot
Read-only: false
browser_navigate
Title: Navigate to a URL
Description: Navigate to a URL
Parameters:
url (string): The URL to navigate to
Read-only: false
browser_navigate_back
Title: Go back
Description: Go back to the previous page
Parameters: None
Read-only: false
browser_network_requests
Title: List network requests
Description: Returns all network requests since loading the page
Parameters: None
Read-only: true
browser_press_key
Title: Press a key
Description: Press a key on the keyboard
Parameters:
key (string): Name of the key to press or a character to generate, such as ArrowLeft or a
Read-only: false
browser_resize
Title: Resize browser window
Description: Resize the browser window
Parameters:
width (number): Width of the browser window
height (number): Height of the browser window
Read-only: false
browser_select_option
Title: Select option
Description: Select an option in a dropdown
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
ref (string): Exact target element reference from the page snapshot
values (array): Array of values to select in the dropdown. This can be a single value or multiple values.
Read-only: false
browser_snapshot
Title: Page snapshot
Description: Capture accessibility snapshot of the current page, this is better than screenshot
Parameters: None
Read-only: true
browser_take_screenshot
Title: Take a screenshot
Description: Take a screenshot of the current page. You can't perform actions based on the screenshot, use browser_snapshot for actions.
Parameters:
type (string, optional): Image format for the screenshot. Default is png.
filename (string, optional): File name to save the screenshot to. Defaults to page-{timestamp}.{png|jpeg} if not specified. Prefer relative file names to stay within the output directory.
element (string, optional): Human-readable element description used to obtain permission to screenshot the element. If not provided, the screenshot will be taken of viewport. If element is provided, ref must be provided too.
ref (string, optional): Exact target element reference from the page snapshot. If not provided, the screenshot will be taken of viewport. If ref is provided, element must be provided too.
fullPage (boolean, optional): When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Cannot be used with element screenshots.
Read-only: true
browser_type
Title: Type text
Description: Type text into editable element
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
ref (string): Exact target element reference from the page snapshot
text (string): Text to type into the element
submit (boolean, optional): Whether to submit entered text (press Enter after)
slowly (boolean, optional): Whether to type one character at a time. Useful for triggering key handlers in the page. By default entire text is filled in at once.
Read-only: false
browser_wait_for
Title: Wait for
Description: Wait for text to appear or disappear or a specified time to pass
Parameters:
time (number, optional): The time to wait in seconds
text (string, optional): The text to wait for
textGone (string, optional): The text to wait for to disappear

Tab management
browser_tabs
Title: Manage tabs
Description: List, create, close, or select a browser tab.
Parameters:
action (string): Operation to perform
index (number, optional): Tab index, used for close/select. If omitted for close, current tab is closed.
Coordinate-based (opt-in via --caps=vision)
browser_mouse_click_xy
Title: Click
Description: Click left mouse button at a given position
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
x (number): X coordinate
y (number): Y coordinate
Read-only: false
browser_mouse_drag_xy
Title: Drag mouse
Description: Drag left mouse button to a given position
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
startX (number): Start X coordinate
startY (number): Start Y coordinate
endX (number): End X coordinate
endY (number): End Y coordinate
Read-only: false
browser_mouse_move_xy
Title: Move mouse
Description: Move mouse to a given position
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
x (number): X coordinate
y (number): Y coordinate
Read-only: false

Test assertions (opt-in via --caps=testing)
browser_generate_locator
Title: Create locator for element
Description: Generate locator for the given element to use in tests
Parameters:
element (string): Human-readable element description used to obtain permission to interact with the element
ref (string): Exact target element reference from the page snapshot
Read-only: true
browser_verify_element_visible
Title: Verify element visible
Description: Verify element is visible on the page
Parameters:
role (string): ROLE of the element. Can be found in the snapshot like this: - {ROLE} "Accessible Name":
accessibleName (string): ACCESSIBLE_NAME of the element. Can be found in the snapshot like this: - role "{ACCESSIBLE_NAME}"
Read-only: false
browser_verify_list_visible
Title: Verify list visible
Description: Verify list is visible on the page
Parameters:
element (string): Human-readable list description
ref (string): Exact target element reference that points to the list
items (array): Items to verify
Read-only: false
browser_verify_text_visible
Title: Verify text visible
Description: Verify text is visible on the page. Prefer browser_verify_element_visible if possible.
Parameters:
text (string): TEXT to verify. Can be found in the snapshot like this: - role "Accessible Name": {TEXT} or like this: - text: {TEXT}
Read-only: false
browser_verify_value
Title: Verify value
Description: Verify element value
Parameters:
type (string): Type of the element
element (string): Human-readable element description
ref (string): Exact target element reference that points to the element
value (string): Value to verify. For checkbox, use "true" or "false".
Read-only: false
Tracing (opt-in via --caps=tracing)
browser_start_tracing
Title: Start tracing
Description: Start trace recording
Parameters: None
Read-only: true
browser_stop_tracing
Title: Stop tracing
Description: Stop trace recording
Parameters: None
Read-only: true 