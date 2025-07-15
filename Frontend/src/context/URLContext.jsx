import React, { createContext, useContext, useState } from "react";
import { log } from "logging-middleware";  
import generateShortCode from "../utils/generateShortCode";
import validateCustomCode from "../utils/validateCustomCode";
import { addMinutes, isAfter } from "../utils/timeUtils";

const URLContext = createContext();

export const useURLContext = () => useContext(URLContext);

export const URLProvider = ({ children }) => {
  const [urls, setUrls] = useState([]); 

  const isShortCodeUnique = (code) => !urls.some((u) => u.shortCode === code);

  const createShortURL = ({ longUrl, validityMinutes, customCode }) => {
    let shortCode = "";
    let custom = false;
    let error = null;
    validityMinutes = parseInt(validityMinutes);
    if (!validityMinutes || isNaN(validityMinutes) || validityMinutes <= 0) {
      validityMinutes = 30;
    }

    if (customCode) {
      if (!validateCustomCode(customCode)) {
        error = "Custom code must be alphanumeric and 4-12 characters.";
        log("frontend", "error", "api", `Invalid customCode: ${customCode}`);
        return { error };
      }
      if (!isShortCodeUnique(customCode)) {
        error = "Custom code is already taken.";
        log("frontend", "error", "api", `Duplicate customCode: ${customCode}`);
        return { error };
      }
      shortCode = customCode;
      custom = true;
    } else {
      let tries = 0;
      do {
        shortCode = generateShortCode();
        tries++;
      } while (!isShortCodeUnique(shortCode) && tries < 10);
      if (!isShortCodeUnique(shortCode)) {
        error = "Failed to generate a unique short code. Please try again.";
        log("frontend", "error", "api", `Failed to generate unique shortCode`);
        return { error };
      }
    }

    const now = new Date();
    const expiresAt = addMinutes(now, validityMinutes);
    const newUrl = {
      shortCode,
      longUrl,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      custom,
      visits: [] 
    };
    setUrls((prev) => [...prev, newUrl]);
    log("frontend", "info", "api", `Short URL created: ${shortCode} for ${longUrl}`);
    return { shortCode };
  };

  const handleRedirect = (shortCode) => {
    const urlObj = urls.find((u) => u.shortCode === shortCode);
    if (!urlObj) {
      log("frontend", "error", "api", `Shortcode not found: ${shortCode}`);
      return { error: "Shortcode not found." };
    }
    const now = new Date();
    if (isAfter(now, new Date(urlObj.expiresAt))) {
      log("frontend", "warn", "api", `Short URL expired: ${shortCode}`);
      return { error: "Short URL has expired." };
    }

    urlObj.visits.push({ timestamp: now.toISOString() });
    setUrls((prev) => prev.map((u) => (u.shortCode === shortCode ? urlObj : u)));
    log("frontend", "info", "api", `Short URL visited: ${shortCode}`);
    return { longUrl: urlObj.longUrl };
  };

  const getAnalytics = () =>
    urls.map((u) => ({
      ...u,
      visitCount: u.visits.length,
      expired: isAfter(new Date(), new Date(u.expiresAt)),
    }));

  return (
    <URLContext.Provider
      value={{
        urls,
        createShortURL,
        handleRedirect,
        getAnalytics,
      }}
    >
      {children}
    </URLContext.Provider>
  );
};
