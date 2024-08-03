// export const getFromLocalStorage = (key: string) => {
//   try {
//     const value = localStorage.getItem(key);
//     return value ? JSON.parse(value) : null;
//   } catch (error) {
//     console.error("Error getting value from local storage:", error);
//     return null;
//   }
// };

// export const setInLocalStorage = (key: string, value: any) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.error("Error setting value in local storage:", error);
//   }
// };

// export const removeFromLocalStorage = (key: string) => {
//   try {
//     localStorage.removeItem(key);
//   } catch (error) {
//     console.error("Error removing value from local storage:", error);
//   }
// };


export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting value from local storage:", error);
      return null;
    }
  }
  return null;
};

export const setInLocalStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting value in local storage:", error);
    }
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing value from local storage:", error);
    }
  }
};
