const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment");
const uuid = require("uuid");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  q = "SELECT * FROM user WHERE email = ? AND password = ?";
  conn.query(q, [email, password], (err, rows, fields) => {
    if (err) console.log(err);
    if (rows.length > 0) res.status(200).send(rows[0]);
    else {
      res.status(500).send({ message: "Sai tài khoản hoặc mật khẩu" });
    }
  });
});

router.post("/signup", (req, res, next) => {
  let check = true;
  const { email, password } = req.body;

  q = "SELECT * FROM user WHERE email = ?";
  let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  conn.query(q, [email], (err, rows, fields) => {
    if (err) console.log(err);
    if (rows.length > 0) {
      res.status(500).send({ message: "Sai tài khoản hoặc mật khẩu" });
    } else {
      q = "INSERT INTO user (id, email, password,timestamp) VALUES (?,?,?,?)";
      conn.query(q, [uuid.v4(), email, password, date], (err, rows, fields) => {
        if (err) console.log(err);
        else {
          res.status(200).send({ email });
        }
      });
    }
  });
});

router.get("/getUser/:idUser", (req, res, next) => {
  q = "SELECT * FROM user WHERE id = ?";
  conn.query(q, [req.params.idUser], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send(rows);
    }
  });
});

router.post("/addPlace", upload.array("photos", 10), (req, res, next) => {
  var file = req.files;
  var file1 = file.map((item) => item.buffer.toString("base64"));
  let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  const { name, location, about, target, timeStart, timeEnd, price } = req.body;

  q = `INSERT INTO place (id, name, location, about, images, target, timeStart, timeEnd, price, timestamp, rate) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  conn.query(
    q,
    [
      uuid.v4(),
      name,
      location,
      about,
      `["${file1[0]}", "${file1[1]}" , "${file1[2]}", "${file1[3]}", "${file1[4]}"]`,
      target,
      timeStart,
      timeEnd,
      price,
      date,
      5,
    ],
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        res.status(200).send({ message: "Success" });
      }
    }
  );
});

router.get("/getPlace", (req, res, next) => {
  q = "SELECT * FROM place";

  conn.query(q, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send(rows);
    }
  });
});

router.get("/getPlaceById/:id", (req, res, next) => {
  q = "SELECT * FROM place WHERE ID = ?";

  const { id } = req.params;

  conn.query(q, [id], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send(rows);
    }
  });
});

router.post("/addComment", (req, res, next) => {
  const { idUser, idPlace, rateStar, commentDetail } = req.body;
  let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  q = `INSERT INTO comment (id, idUser, idPlace, rateStar, commentDetail, timestamp) VALUES(?,?,?,?,?,?)`;

  conn.query(
    q,
    [uuid.v4(), idUser, idPlace, rateStar, commentDetail, date],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ message: "Success!" });
      }
    }
  );
});

router.get("/getComment/:idPlace", (req, res, next) => {
  q = "SELECT * FROM comment WHERE idPlace = ?";
  conn.query(q, [req.params.idPlace], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send(rows);
    }
  });
});

router.put("/updateTest", (req, res, next) => {
  const { rateStar, rateComment, idPlace } = req.body;

  const rateAfterUpdate = Math.round((rateStar + rateComment) / 2);

  if (rateAfterUpdate == 0) rateAfterUpdate = 1;
  q = "UPDATE place SET rate = ? WHERE id = ?";
  conn.query(q, [rateAfterUpdate, idPlace], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "Success Update !" });
    }
  });
});

router.post("/addBlog", upload.single("photo"), (req, res, next) => {
  const { idUser, title, photos, content } = req.body;
  const img = req.file.buffer.toString("base64");

  // console.log(req.body);
  // const dataPhotos = photos.map((item) => item.thumbUrl.split(",")[1]);
  let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  q =
    "INSERT INTO blog (id, title, idUser, image, content, timestamp) VALUES(?, ?, ?, ?, ?, ?)";

  conn.query(
    q,
    [uuid.v4(), title, idUser, `["${img}"]`, content, date],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("Succedd");
      }
    }
  );
});

router.get("/getAllBlog", (req, res, next) => {
  q = "SELECT * FROM blog";
  conn.query(q, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

router.get("/getBlogById/:id", (req, res, next) => {
  q = "SELECT * FROM blog WHERE id = ?";
  conn.query(q, [req.params.id], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send(rows);
    }
  });
});

router.get("/getBlogByIdUser/:id", (req, res, next) => {
  q = "SELECT * FROM blog WHERE idUser = ?";
  conn.query(q, [req.params.id], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send(rows);
    }
  });
});

router.put("/updateBlog", upload.single("photo"), (req, res, next) => {
  const { id, title, content } = req.body;

  let img;
  if (req.file) {
    img = req.file.buffer.toString("base64");
  }

  if (img) {
    q = "UPDATE blog set title = ?, content = ?, image = ? WHERE id = ?";
    conn.query(q, [title, content, `["${img}"]`, id], (err, rows, fields) => {
      if (err) console.log(err);
      else {
        res.status(200).send({ message: "Success" });
      }
    });
  } else {
    q = "UPDATE blog set title = ?, content = ? WHERE id = ?";
    conn.query(q, [title, content, id], (err, rows, fields) => {
      if (err) console.log(err);
      else {
        res.status(200).send({ message: "Success" });
      }
    });
  }
});

router.delete("/deleteBlog/:id", (req, res, next) => {
  const { id } = req.params;
  q = "DELETE FROM blog WHERE id = ?";

  conn.query(q, [id], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.status(200).send({ message: "Success" });
    }
  });
});
// // register userdata
// router.post("/register", upload.single("photo"), (req, res) => {
//   const img = req.file.buffer.toString("base64");

//   q = "INSERT INTO data VALUES(?)";
//   conn.query(q, [img], (err, rows, fields) => {
//     if (err) console.log(err);
//   });

//   //   if (!fname || !filename) {
//   //     res.status(422).json({ status: 422, message: "fill all the details" });
//   //   }

//   //   try {
//   //     let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

//   //     conn.query(
//   //       "INSERT INTO usersdata SET ?",
//   //       { username: fname, userimg: filename, date: date },
//   //       (err, result) => {
//   //         if (err) {
//   //           console.log("error");
//   //         } else {
//   //           console.log("data added");
//   //           res.status(201).json({ status: 201, data: req.body });
//   //         }
//   //       }
//   //     );
//   //   } catch (error) {
//   //     res.status(422).json({ status: 422, error });
//   //   }
// });

// // get user data
// router.get("/getdata", (req, res) => {
//   try {
//     conn.query("SELECT * FROM data", (err, result) => {
//       if (err) {
//         console.log("error");
//       } else {
//         console.log("data get");
//         res.status(201).json({ status: 201, data: result });
//       }
//     });
//   } catch (error) {
//     res.status(422).json({ status: 422, error });
//   }
// });

// // delete user
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   try {
//     conn.query(`DELETE FROM usersdata WHERE id ='${id}'`, (err, result) => {
//       if (err) {
//         console.log("error");
//       } else {
//         console.log("data delete");
//         res.status(201).json({ status: 201, data: result });
//       }
//     });
//   } catch (error) {
//     res.status(422).json({ status: 422, error });
//   }
// });

module.exports = router;
