const express = require("express");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
const User = require("./user.js");
const Products = require("./product");
// const fileType = require("file-type ");
var fs = require("fs");
const app = express();
const user = new Array();
const products = new Array();
products.push(
  new Products(
    "1",
    "áo1",
    "100000",
    "https://lh6.googleusercontent.com/xr1tWQ0zigU8mFvMGfMmW2oiX9yinGbn8LaRLMHnPXvsh7Bg1ABs2Tk8ZfAoQMv6mPw9Id-iaSB1zuU5UTJmCcnTybFvdiaC-EHxrdTbRmNJT22y1tmSb5rE1--xKXg3TrmwO2z3"
  )
);
products.push(
  new Products(
    "2",
    "áo2",
    "100000",
    "https://lh6.googleusercontent.com/xr1tWQ0zigU8mFvMGfMmW2oiX9yinGbn8LaRLMHnPXvsh7Bg1ABs2Tk8ZfAoQMv6mPw9Id-iaSB1zuU5UTJmCcnTybFvdiaC-EHxrdTbRmNJT22y1tmSb5rE1--xKXg3TrmwO2z3"
  )
);
products.push(
  new Products(
    "3",
    "áo3",
    "100000",
    "https://lh6.googleusercontent.com/xr1tWQ0zigU8mFvMGfMmW2oiX9yinGbn8LaRLMHnPXvsh7Bg1ABs2Tk8ZfAoQMv6mPw9Id-iaSB1zuU5UTJmCcnTybFvdiaC-EHxrdTbRmNJT22y1tmSb5rE1--xKXg3TrmwO2z3"
  )
);
products.push(
  new Products(
    "4",
    "áo4",
    "100000",
    "https://lh6.googleusercontent.com/xr1tWQ0zigU8mFvMGfMmW2oiX9yinGbn8LaRLMHnPXvsh7Bg1ABs2Tk8ZfAoQMv6mPw9Id-iaSB1zuU5UTJmCcnTybFvdiaC-EHxrdTbRmNJT22y1tmSb5rE1--xKXg3TrmwO2z3"
  )
);
products.push(
  new Products(
    "5",
    "áo5",
    "100000",
    "https://lh6.googleusercontent.com/xr1tWQ0zigU8mFvMGfMmW2oiX9yinGbn8LaRLMHnPXvsh7Bg1ABs2Tk8ZfAoQMv6mPw9Id-iaSB1zuU5UTJmCcnTybFvdiaC-EHxrdTbRmNJT22y1tmSb5rE1--xKXg3TrmwO2z3"
  )
);
user.push(
  new User(
    "1",
    "trinhdien606@gmail.com",
    "123",
    "https://i.pinimg.com/564x/ea/29/d3/ea29d38a4b63dd36ac2b810e9b2bd41a.jpg"
  )
);
user.push(
  new User(
    "2",
    "a@gmail.com",
    "123",
    "https://i.pinimg.com/564x/11/97/15/119715295c0529b5618f4e3f404d4463.jpg"
  )
);
user.push(
  new User(
    "3",
    "b@gmail.com",
    "123",
    "https://i.pinimg.com/564x/05/6b/e8/056be8ef82f194cddf3baa763f88ed2e.jpg"
  )
);
user.push(
  new User(
    "4",
    "c@gmail.com",
    "123",
    "https://i.pinimg.com/236x/bc/bd/dd/bcbdddc87f244100336ce38caf1e8ba3.jpg"
  )
);
user.push(
  new User(
    "5",
    "d@gmail.com",
    "123",
    "https://i.pinimg.com/564x/28/db/8a/28db8a393798dccc90f59ae7b0f4d954.jpg"
  )
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
const checkUserNamePassword = (email, password, res) => {
  if (email == "a@gmail.com" && password == "123") {
    res.render("emptyView", { layout: "layoutHome", user: user });
  } else {
    res.render("emptyView", { layout: "layoutLoginErr" });
  }
};
const checkRegister = (email, password, repassword, res) => {
  if (password != repassword || password == "" || repassword == "") {
    res.render("emptyView", { layout: "registerErr" });
  } else {
    res.render("login", { layout: "main" });
  }
};
const checkFileType = (req, res, next) => {
  const file = req.file;
  const email = req.body.rsemail;
  // Get the file type
  // const fileTypeResult = fileType(file.buffer);

  // Define allowed file types
  // const allowedFileTypes = ["jpg", "jpeg", "png"];

  // If file type is not allowed, send error response
  // if (!allowedFileTypes.includes(fileTypeResult.ext) && !file) {
  //   return res.status(400).json({ error: "Invalid file type" });
  // }
  if (!file) {
    res.render("emptyView", {
      layout: "registerErr",
      email: email,
    });
  }

  // File type is allowed, proceed to next middleware
  next();
};
const checkFields = (req, res, next) => {
  // console.log(req);
  const password = req.body.rspassword;
  const repass = req.body.rsrepassword;
  console.log(password);
  console.log(repass);
  if (password != repass) {
    res.status(400).json({ error: "All fields are required" });
  }
  next();
};
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "./public";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, "public");
  },
  filename: function (req, file, cb) {
    var tenGoc = file.originalname;
    arr = tenGoc.split(".");

    let newFileName = "";

    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        newFileName += arr[i];
      } else {
        newFileName += "-" + Date.now() + "." + arr[i];
      }
    }

    cb(null, newFileName);
  },
});

var upload = multer({
  storage: storage,
});
app.get("/home", (req, res, next) => {
  res.render("emptyView", { layout: "layoutHome", user: user });
});
app.get("/products", (req, res, next) => {
  res.render("emptyView", { layout: "layoutProducts", products: products });
});
app.post(
  "/register",
  checkFields,
  upload.single("myFile"),
  checkFileType,
  (req, res) => {
    const email = req.body.rsemail;
    const password = req.body.rspassword;
    const repass = req.body.rsrepassword;
    console.log(email);
    console.log(password);
    console.log(repass);
    checkRegister(email, password, repass, res);
  }
);
app.post("/products/delete", (req, res) => {
  const remove = products.findIndex(
    (item) => item.id == Number(req.body.itemId)
  );
  products.splice(remove, 1);
  res.redirect("/products");
});
app.post("/home/delete", (req, res) => {
  const remove = user.findIndex((item) => item.id == Number(req.body.itemId));
  user.splice(remove, 1);
  res.redirect("/home");
});
app.post("/products/edit", (req, res) => {
  const edit = products.findIndex((item) => item.id == Number(req.body.itemId));
  console.log(req.body);
  products[edit] = new Products(
    req.body.itemId,
    req.body.name,
    req.body.price,
    req.body.img
  );
  res.redirect("/products");
});
app.post("/home/edit", (req, res) => {
  const edit = user.findIndex((item) => item.id == Number(req.body.itemId));
  console.log(req.body);
  user[edit] = new User(
    req.body.itemId,
    req.body.email,
    req.body.password,
    req.body.img
  );
  res.redirect("/home");
});
app.post("/home/add-user", (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const password = req.body.password;
  const img = req.body.img;
  if (email == "" || id == "" || password == "" || img == "") {
    res.status(400).json({ error: "Add user failed" });
  } else {
    user.push(new User(id, email, password, img));
  }
  res.redirect("/home");
});
app.post("/products/add-products", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const price = req.body.price;
  const img = req.body.img;
  if (name == "" || id == "" || price == "" || img == "") {
    res.status(400).json({ error: "Add products failed" });
  } else {
    products.push(new Products(id, name, price, img));
  }
  res.redirect("/products");
});
app.post("/home/search", (req, res) => {
  let userSearch = new Array();
  user.map((item, index, arr) => {
    if (item.email.includes(req.body.txtSearch) == true) {
      userSearch.push(item);
    }
  });
  res.render("emptyView", { layout: "layoutHome", user: userSearch });
});
app.post("/products/search", (req, res) => {
  let productSearch = new Array();
  products.map((item, index, arr) => {
    if (item.name.includes(req.body.txtSearch) == true) {
      productSearch.push(item);
    }
  });
  res.render("emptyView", {
    layout: "layoutProducts",
    products: productSearch,
  });
});
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.get("/", (req, res) => {
  res.render("register", { layout: "main" });
});
app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  checkUserNamePassword(email, password, res);
});
app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
