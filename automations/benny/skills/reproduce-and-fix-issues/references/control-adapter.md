# Chrome DevTools MCP procedure

1. List pages, select the configured staging tab, and inspect its current URL. If it needs navigation, verify the destination against the configured exact staging origin before navigating. Verify the resulting page URL and marker before each interaction sequence.
2. Use a snapshot to locate the user-visible controls. Use the direct MCP click, fill, and viewport tools to perform the journey. Use evaluation only to inspect state and computed style. Do not inject workarounds or modify application state outside normal actions.
3. Record the route and viewport, UI selectors or labels, before and after DOM or computed style, relevant network method, path, status and redacted request or response shape, and new console errors. Check that the request and response belong to the interaction. Use the team's staging logs if the reported symptom originates in a downstream app.
4. Reset synthetic fixtures between runs. Record the staging marker and observed running revisions for both baseline and the patched preview. Stop if the tool connection fails or the target leaves staging.
