export const post = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return await res.json();
    }

    const resData = await res.json();

    return resData;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const get = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return await res.json();
    }

    const resData = await res.json();

    return resData;
  } catch (err) {
    console.error("Error getting data:", err);
  }
};
