export const SMART_LINK_URL =
  "https://www.profitableratecpmnetwork.com/essq4f0zag?key=31503db559f359905e7f17e6ac2d1cc1";

export const openSmartLink = () => {
  window.open(SMART_LINK_URL, "_blank", "noopener,noreferrer");
};

/**
 * Triggers the smart link ad when a button is clicked.
 * Preserves the target page and action in browser history so that
 * when the user clicks "Back" in their browser, the destination page is open!
 */
export const triggerSmartLinkOnButtonClick = (
  targetPage?: string,
  targetAction?: string,
  onStateUpdate?: () => void
) => {
  try {
    // 1. Execute local state change if provided
    if (onStateUpdate) {
      onStateUpdate();
    }

    // 2. Determine target URL to save in history
    if (targetPage) {
      const url = new URL(window.location.href);
      url.searchParams.set("page", targetPage);
      if (targetAction) {
        url.searchParams.set("action", targetAction);
      } else {
        url.searchParams.delete("action");
      }
      // Push history state so pressing browser "Back" lands on this target page
      window.history.pushState(
        { page: targetPage, action: targetAction },
        "",
        url.toString()
      );
    }

    // 3. Navigation handling based on environment:
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      // In iframe preview, direct window.location is blocked by ad network's X-Frame-Options.
      // So opening in new tab displays the ad, and the preview displays the page.
      window.open(SMART_LINK_URL, "_blank", "noopener,noreferrer");
    } else {
      // Standalone (e.g., Netlify production domain):
      // Redirect directly to the smart link.
      // When user clicks the browser "Back" button, it returns to the pushed history entry!
      window.location.href = SMART_LINK_URL;
    }
  } catch (err) {
    console.error("Ad redirect error:", err);
    if (onStateUpdate) {
      onStateUpdate();
    }
  }
};
