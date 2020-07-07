const dataRouter = require("express").Router();
const http = require("http");
const request = require("request");
const requestPromise = require("request-promise-native");
// http://open-api.myhelsinki.fi/v1/activities
dataRouter.get("/", async (req, res) => {
  console.log("dataRouterAll(start0&limit10)");
  console.log("req.params", req.params);
  if (req) {
    try {
      var headers = {
        accept: "application/json",
      };

      var options = {
        url: "http://open-api.myhelsinki.fi/v1/activities/?limit=10&start=0",
        headers: headers,
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body);
          res.json(body);
        }
      }

      request(options, callback);
    } catch (err) {
      console.log("err", err);
    }
  }
});
dataRouter.get("/limit/:range", async (req, res) => {
  console.log("dataRouterLIMIT");
  console.log("req.params", req.params);
  if (req) {
    try {
      var headers = {
        accept: "application/json",
      };

      var options = {
        url: "http://open-api.myhelsinki.fi/v1/activities/?" + req.params.range,
        headers: headers,
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body);
          res.json(body);
        }
      }

      request(options, callback);
    } catch (err) {
      console.log("err", err);
    }
  }
});
dataRouter.get("/tag/:tag", async (req, res) => {
  console.log("dataRouterTAG");

  if (req) {
    try {
      var headers = {
        accept: "application/json",
      };

      var options = {
        url:
          "http://open-api.myhelsinki.fi/v1/activities/?tags_filter=" +
          req.params.tag.replace(":", "%3A") +
          "&limit=10&start=0",
        headers: headers,
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("dataRouterTAG CALLBACK");
          res.json(body);
        }
      }

      request(options, callback);
    } catch (err) {
      console.log("err", err);
    }
  }
});
dataRouter.get("/id/:id", async (req, res) => {
  console.log("dataRouterID");
  console.log("req.params", req.params);
  if (req) {
    try {
      var headers = {
        accept: "application/json",
      };

      var options = {
        url: "http://open-api.myhelsinki.fi/v1/activity/" + req.params.id,
        headers: headers,
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("dataRouterID CALLBACK");
          res.json(body);
        }
      }

      request(options, callback);
    } catch (err) {
      console.log("err", err);
    }
  }
});
dataRouter.get("/items/:items", async (req, res) => {
  console.log("dataRouterITEMS");
  console.log("req.params", req.params);
  if (req) {
    const itemsArray = req.params.items.split(",");
    const itemsArrayLen = itemsArray.length;
    var resultArray = [];
    var i = 0;
    for (i; i < itemsArrayLen; i++) {
      try {
        var headers = {
          accept: "application/json",
        };

        var options = {
          url: "http://open-api.myhelsinki.fi/v1/activity/" + itemsArray[i],
          headers: headers,
        };

        const result = await requestPromise(options);
        resultArray.push(JSON.parse(result));
      } catch (err) {
        console.log("err", err);
      }
    }
    if (resultArray.length === itemsArrayLen) {
      const tagsArray = resultArray.map((i) => i.tags);
      var tags = {};
      for (var arr of tagsArray) {
        for (var item of arr) {
          tags[item.id] = item.name;
        }
      }
      const savedItemsData = {
        meta: {
          count: resultArray.length,
        },
        data: resultArray,
        tags,
      };
      //console.log("savedItemsData", JSON.stringify(savedItemsData));
      res.send(JSON.stringify(savedItemsData));
    }
  }
});

module.exports = dataRouter;
