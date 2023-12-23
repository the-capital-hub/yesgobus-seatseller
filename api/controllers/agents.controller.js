import { registerAgent, loginAgent } from '../service/agents.service.js';

export const registerAgentController = async (req, res) => {
  try {
    const result = await registerAgent(req.body);
    res.status(result.status).json({ message: result.message, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while registering an agent" });
  }
};

export const loginAgentController = async (req, res) => {
  try {
    const { emailMobile, password } = req.body;
    const result = await loginAgent(emailMobile, password);

    if (result.status === 200) {
      res.cookie("token", result.token, {
        maxAge: 3600000,
      });
    }

    res.status(result.status).json({ message: result.message, token: result.token, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};
