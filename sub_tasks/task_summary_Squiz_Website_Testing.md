# Squiz_Website_Testing

I have completed the testing of the Squiz website. The following is a summary of my findings:

**Testing Summary:**

*   **Login:** I was able to successfully log in with the provided credentials.
*   **Dashboard:** The dashboard loaded, but with a critical error: "Statistika məlumatları yüklənə bilmədi" (Statistics data could not be loaded). This was confirmed by multiple HTTP 400 errors in the console logs related to the `quiz_results` API endpoint.
*   **Quiz Functionality:** I was able to successfully start, complete, and submit a quiz without any visible "Failed to complete quiz" errors. The quiz workflow appears to be functioning correctly on the front-end.
*   **Page Loading:** The Settings and Profile pages loaded successfully without any "Something went wrong" errors.
*   **UI Elements:** The UI selection elements (radio buttons) in the quiz worked as expected and did not exhibit any shrinking issues.

**Conclusion:**

The primary issue identified is the failure to load statistics on the dashboard, which is caused by an underlying API issue with the `quiz_results` endpoint. While the quiz completion workflow itself appears to be functional from a user perspective, the inability to retrieve and display results is a critical bug. The rest of the tested functionality, including page loading and UI elements, appears to be working correctly.

**Recommendations:**

*   The development team should investigate and resolve the HTTP 400 errors related to the `quiz_results` API endpoint. This is likely the root cause of the dashboard statistics issue and may also be affecting other parts of the application that rely on quiz data.

## Key Files

