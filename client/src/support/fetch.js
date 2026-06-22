const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const post = async (path, data) => {
  try {
    const res = await fetch(BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return await res.json();
    }

    return await res.json();
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const get = async (path) => {
  try {
    const res = await fetch(BASE_URL + path);

    if (!res.ok) {
      return await res.json();
    }

    return await res.json();
  } catch (err) {
    console.error("Error getting data:", err);
  }
};

export const del = async (path) => {
  try {
    const res = await fetch(BASE_URL + path, {
      method: "DELETE",
    });

    if (!res.ok) {
      return await res.json();
    }

    return await res.json();
  } catch (err) {
    console.error("Error deleting data:", err);
  }
};
