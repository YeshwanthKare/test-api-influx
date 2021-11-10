const router = require("express").Router();
const influx = require("../../config/database");
const deviceValidation = require("../../middlewares/device-auth");
const userValidation = require("../../middlewares/user-auth");

router.get("/", userValidation, async (req, res) => {
  try {
    const result = await influx.query(
      `
    select * from session
  `
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error });
  }
});

router.post("/session", deviceValidation, async (req, res) => {
  try {
    const sessionInfo = req.body;

    const client = [
      {
        measurement: "session",
        // tags: {
        //   ADC_main: sessionInfo.ADC_main,
        //   ADC1: sessionInfo.ADC1,
        //   ADC2: sessionInfo.ADC2,
        //   ADC3: sessionInfo.ADC3,
        //   ADC4: sessionInfo.ADC4,
        //   ADC5: sessionInfo.ADC5,
        //   ADC6: sessionInfo.ADC6,
        // },
        fields: {
          iccid: sessionInfo.iccid,
          ADC_main: sessionInfo.ADC_main,
          ADC1: sessionInfo.ADC1,
          ADC2: sessionInfo.ADC2,
          ADC3: sessionInfo.ADC3,
          ADC4: sessionInfo.ADC4,
          ADC5: sessionInfo.ADC5,
          ADC6: sessionInfo.ADC6,
        },
        time: Date.now(),
      },
    ];

    console.log(client);
    await influx.writePoints(client, {
      database: "influx-db",
      precision: "s",
    });
    return res.json({ success: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
