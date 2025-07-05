// Simple admin model (for demo, one hardcoded admin)
const admin = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "mernposting", // In production, hash this!
};

export default admin;
