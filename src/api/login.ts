import api from "./_api";

export type LOGIN_API_TYPES = {
    callback: {
        name: string;
        email: string;
        profilePicture: string;
      }
}

export async function loginCallback(token: string) {
  const { data } = await api.post("/login-callback", {
    idToken: token,
  });

  return data;
}
