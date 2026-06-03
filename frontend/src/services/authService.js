const API = import.meta.env.VITE_API_URL;

export const registerUser = async (
  name,
  email,
  password
) => {
  const res = await fetch(
    `${API}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  return res.json();
};

export const loginUser = async (
  email,
  password,
  rememberMe
) => {
  const res = await fetch(
    `${API}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await res.json();

  if (data.success) {
    if (rememberMe) {
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user_name",
        data.name
      );
    } else {
      sessionStorage.setItem(
        "token",
        data.token
      );

      sessionStorage.setItem(
        "user_name",
        data.name
      );
    }
  }

  return data;
};

export const getToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_name");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user_name");
};

export const isAuthenticated = () => {
  return !!getToken();
};