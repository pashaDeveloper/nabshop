const Session = require("../models/session.model");
// initialize session

async function initSession(req, res, next) {
  try {
    let sessionData = await Session.findOne({ sessionId: req.sessionID });
    console.log("sessionData", sessionData);
    if (!sessionData) {
      req.session.userId = `guest_${Date.now()}`;
      sessionData = await Session.create({
        sessionId: req.sessionID,
        userId: req.session.userId,
        role: "buyer"
      });

      console.log("sessionData", sessionData);
    } else {
      await sessionData.incrementVisitCount();
    }

    res.json({
      sessionId: sessionData.sessionId,
      userId: sessionData.userId,
      role: sessionData.role
    });
  } catch (err) {
    console.error("Error in createSession:", err);
    next(err);
  }
}

// get session
async function getSession(req, res, next) {
  try {
    const sessionData = await Session.findOne({ sessionId: req.sessionID });

    if (!sessionData) {
      return res.status(404).json({
        acknowledgement: false,
        message: "یافت نشد",
        description: "نشست فعالی برای شما یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "موفق",
      description: "سیشین با موفقیت دریافت شد",
      data: sessionData
    });
  } catch (err) {
    next(err); 
  }
}

// delete session
async function deleteSession(req, res) {
  try {
    const sessionData = await Session.findOneAndDelete({
      sessionId: req.sessionID
    });
    res.json(sessionData || { message: "No session found" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  initSession,
  getSession,
  deleteSession
};
