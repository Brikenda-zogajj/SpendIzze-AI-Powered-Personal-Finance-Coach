interface User {
  name: string;
  email: string;
  password: string;
}

export const registerUser = (name: string, email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if user already exists
  if (users.some((user: User) => user.email === email)) {
    throw new Error("User already exists");
  }

  // Add new user
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
};

export const loginUser = (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u: User) => u.email === email && u.password === password,
  );

  if (!user) {
    // Check if it's the demo account
    if (email === "demo@example.com" && password === "password") {
      return { name: "Demo User", email };
    }
    throw new Error("Invalid credentials");
  }

  return user;
};
