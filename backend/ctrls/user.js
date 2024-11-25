const users = []

function register(req, res) {
  const { username, email } = req.body;

  // Validate required fields
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required.' });
  }

  // Check if the username or email is already taken
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ error: 'Username or email already exists.' });
  }

  // Create a new user
  const newUser = {
      id: Date.now(), // Use Date.now() as a simple unique ID
      username,
      email,
  };

  // Add the user to the in-memory store
  users.push(newUser);

  // Respond with the new user's details (excluding password)
  res.status(201).json(newUser);
}

export default { register };