const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dnwaszkmv',
  api_key: '347129574223942',
  api_secret: 'nBsMgDRI-7IUb2pAxp9_x3TVrjQ',
  secure: true,
});

cloudinary.v2.uploader.upload("Untitled.png",
    { public_id: "negotiations_2" }
).then(result => console.log(result));