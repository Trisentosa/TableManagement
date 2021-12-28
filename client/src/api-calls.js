//USERS API CALLS
export async function login(email, password) {
  return await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include", //to get cookie
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function logout() {
  return await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
  });
}

export async function register(name, email, password) {
  return await fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function getUser() {
  return await fetch("http://localhost:8000/api/user", {
    method: "GET",
    credentials: "include",
  });
}

//ENTRY API CALLS

export async function createEntry(company, product, quantity, etd, eta) {
  return await fetch("http://localhost:8000/table/create", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      company,
      product,
      quantity,
      etd,
      eta,
    }),
    credentials: "include",
  });
}
export async function updateEntry(id, company, product, quantity, etd, eta) {
  return await fetch("http://localhost:8000/table/update", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id,
      company,
      product,
      quantity,
      etd,
      eta,
    }),
    credentials: "include",
  });
}
export async function deleteEntry(id) {
  return await fetch("http://localhost:8000/table/delete", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id,
    }),
    credentials: "include",
  });
}

export async function getEntries() {
  return await fetch("http://localhost:8000/table/getAll", {
    method: "GET",
    credentials: "include",
  });
}
