const SEEN_KEY = 'welcomeSeen';

// The welcome screen shows once per browser session, not on every reload
export const hasSeenWelcome = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

export const markWelcomeSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Storage blocked, the modal will just show again next visit
  }
};
