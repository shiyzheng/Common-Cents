const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dnwaszkmv', 
  api_key: '347129574223942', 
  api_secret: 'nBsMgDRI-7IUb2pAxp9_x3TVrjQ' 
});

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" }, 
    function(error, result) {
        console.log(result); 
    }
);