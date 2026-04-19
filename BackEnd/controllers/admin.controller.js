import GatewayConfig from "../models/GatewayConfig.model.js";
import ExternalServer from "../models/ExternalServer.model.js";

export const getGatewayConfig = async (req, res) => {
  try {
    let config = await GatewayConfig.findOne();
    if (!config) {
      config = await GatewayConfig.create({ activeGateway: "razorpay" });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGatewayConfig = async (req, res) => {
  try {
    const { activeGateway } = req.body;
    let config = await GatewayConfig.findOne();
    if (config) {
      config.activeGateway = activeGateway;
      await config.save();
    } else {
      config = await GatewayConfig.create({ activeGateway });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExternalConfig = async (req, res) => {
  try {
    let config = await ExternalServer.findOne();
    if (!config) {
      config = await ExternalServer.create({});
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExternalConfig = async (req, res) => {
  try {
    const { baseUrl, apiKey, isActive } = req.body;
    let config = await ExternalServer.findOne();
    if (config) {
      if (baseUrl !== undefined) config.baseUrl = baseUrl;
      if (apiKey !== undefined) config.apiKey = apiKey;
      if (isActive !== undefined) config.isActive = isActive;
      await config.save();
    } else {
      config = await ExternalServer.create({ baseUrl, apiKey, isActive });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
