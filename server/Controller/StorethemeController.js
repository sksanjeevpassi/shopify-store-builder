const storetheme = require("../models/storetheme");
var request = require('request');

const storeSaves = async (req, res) => {
  try {

      // const { filename } = req.file;
      console.log(req.body);

    //  const storeTheme = new storetheme({
  //       'store_name': req.body.storename,
  //       'business_name': req.body.business_name,
  //       'color': req.body.theme_color,
  //       'theme':  "https://frontend-cutomewebsite.webgarh.net/theme.zip",
  //       'fonts': req.body.fontchoices,
  //   })
  //    await storeTheme.save()
    // res.send(storeTheme)
    console.log("---here---");
    console.log(req.body);
    if(req.body.storename && req.body.access_token){
      var options = {
        'method': 'POST',
        'url': `https://${req.body.storename}.myshopify.com/admin/api/2023-07/themes.json`,
        'headers': {
          'X-Shopify-Access-Token': req.body.access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "theme": {
            "name": req.body.businessname,
            "src": "https://frontend-cutomewebsite.webgarh.net/theme.zip",
            "role": "main"
          }
        })
      
      };
      
      request(options, function (error, resp) {
        if(error){
          res.status(200).json({ status:"error", message: "something wrong, please check you .zip file!" });
        }else{
            var response = JSON.parse(resp.body);

            if (response.errors) {
              res.status(200).json({ status:"error", message: "something wrong!" });
            }else{
              if (response.hasOwnProperty('theme')) { 
                if(response.theme.id){
                  var theme_id = response.theme.id;
                }else{
                  var theme_id = null;
                }
              }else{
                var theme_id = null;
              }
              res.status(200).json({ status:"success", message: "Theme uploaded Successfully.",theme_name:theme_id,theme_id:theme_id});
            }
        }
      });

    }else{
      res.status(200).json({ status:"error", message: "please check your access token and store name !!" });
    }
   } catch (error) {
      res.status(200).json({ status:"error", message: "please uplod theme .zip file!",error });
   }
};


module.exports = {
   storeSaves
};