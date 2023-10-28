const storeDetails = require("../models/storedetails");
const request = require("request");
const ejs = require("ejs");
require("dotenv/config");
const Sendmail = require('../Helper/Email.js');


async function renderEjsTemplateWithData(templatePath, data, htmlRes) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, html) => {
      if (err) {
        reject(err);
      } else {
        // Set the 'Content-Type' header to 'text/html'
        htmlRes.setHeader("Content-Type", "text/html");
        resolve(html);
      }
    });
  });
}

async function renderConfig(req, page_privacy_policy, privacy_html) {
  return new Promise((resolve, reject) => {
   if(req.body.storename){
      var options_2 = {
         method: "PUT",
         url: `https://${req.body.storename}.myshopify.com/admin/api/2023-10/themes/${req.body.theme_id}/assets.json`,
         headers: {
         "X-Shopify-Access-Token": req.body.access_token,
         "Content-Type": "application/json",
         },
         body: JSON.stringify({
         asset: {
            key: `templates/${page_privacy_policy}`,
            value: privacy_html,
         },
         }),
      };
      resolve(options_2);

   }else{
      reject("store name required!");
   }

  });
}

async function makeRequest(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

async function updateStoreTheme(req, res, options, options_1) {
  try {
    const response = await makeRequest(options);

    if (response.errors) {
      return res
        .status(200)
        .json({ status: "error", message: "Store theme ID not found!" });
    }

    const response1 = await makeRequest(options_1);

    if (response1.errors) {
      return res.status(200).json({
        status: "error",
        message:
          "Please go to the previous step and upload the .zip file again.",
      });
    }
    const html_render = "{% render 'customWebsite' %}\n";
    if (response1.body) {
      const jsonParseDate = JSON.parse(response1.body);
      const html_render2 = html_render + jsonParseDate.asset.value;
      const options_header = {
        method: "PUT",
        url: `https://${req.body.storename}.myshopify.com/admin/api/2023-10/themes/${req.body.theme_id}/assets.json`,
        headers: {
          "X-Shopify-Access-Token": req.body.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: {
            key: "sections/header.liquid",
            value: html_render2,
          },
        }),
      };

      const response2 = await makeRequest(options_header);

      if (response2.errors) {
        return res
          .status(200)
          .json({ status: "error", message: "Store connected successfully." });
      }

      return res.status(200).json({
        status: "success",
        message: "Store connected successfully.",
        response2,
      });
    }else{
      updateStoreTheme(req, res, options, options_1)
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "An error occurred1.", error });
  }
}

const storeSaves = async (req, res) => {
  try {
    if (req.file) {
      var { filename } = req.file;
    }else{
      var { filename } = "";
    }
      const storeDetail = new storeDetails({
            'store_name': req.body.storename,
            'access_token': req.body.access_token,
            'business_name': req.body.business_name,
            'color': req.body.theme_color,
            'logo':  filename,
            'email': req.body.email,
            'fonts': req.body.fontchoices,
            'product_display': req.body.product_display,
            'payment_method':  req.body.payment_method,
            'shipping_option': "Standard Shipping (7-9 business days) ",
      })
      await storeDetail.save()
      console.log("here");

      var pro_display = "grid";
      var css_str = "";
      if (req.body.product_display == "list") {
        var pro_display = "unset";
        var css_str =
          "ul.grid.product-grid.contains-card.contains-card--product.contains-card--standard.grid--4-col-desktop.grid--2-col-tablet-down .grid {";
        css_str += "display: unset !important;";
        css_str += "}";
        css_str += "\n";
        css_str +=
          "ul.grid.product-grid.contains-card.contains-card--product.contains-card--standard.grid--4-col-desktop.grid--2-col-tablet-down .grid__item {";
        css_str += "width: 100% !important;";
        css_str += "max-width: 100% !important;";
        css_str += "margin-bottom: 30px;";
        css_str += "background: white;";
        css_str += "box-shadow: 0px 0px 10px #ddd;";
        css_str += "height: 300px;";
        css_str += "}";
        css_str += "\n";
        css_str +=
          "ul.grid.product-grid.contains-card.contains-card--product.contains-card--standard.grid--4-col-desktop.grid--2-col-tablet-down .card.card--standard.card--media {";
        css_str += "display: flex;";
        css_str += "flex-direction: row;";
        css_str += "}";
        css_str += "\n";
        css_str +=
          "ul.grid.product-grid.contains-card.contains-card--product.contains-card--standard.grid--4-col-desktop.grid--2-col-tablet-down .card__information {";
        css_str += "padding: 20px !important;";
        css_str += "}";
        css_str += "\n";
        css_str += "li.list-social__item img {";
        css_str += "height: 1.8rem;";
        css_str += "width: 1.8rem;";
        css_str += "vertical-align: middle;";
        css_str += "margin-right: 5px;";
        css_str += "}";
      }

      if (req.body.product_display == "grid") {
        var pro_display = "flex";
        var css_str =
          "ul.grid.product-grid.contains-card.contains-card--product.contains-card--standard.grid--4-col-desktop.grid--2-col-tablet-down .grid {";
        css_str += "display: flex !important;";
        css_str += "}";
      }

      const data = {
        product_display: pro_display,
        payment_method: req.body.payment_method,
        fontchoices: req.body.fontchoices,
        business_name: req.body.business_name,
        storename: req.body.storename,
        theme_color: req.body.theme_color,
        font_color: req.body.font_color,
        filename:filename,
        display_email: req.body.email,
        css_str,
        base_URL:process.env.base_URL
      };
      const templatePath = `${__dirname}/../views/custom-website.ejs`;
      const templatePrivacyPath = `${__dirname}/../views/privacy-policy.ejs`;
      const templateReturnPath = `${__dirname}/../views/return-policy.ejs`;
      const templateTermsPath = `${__dirname}/../views/terms-and-conditions.ejs`;
      // const html = await renderEjsTemplateWithData(templatePath, data);

      // const html = ejs.renderFile(`${__dirname}/../views/custom-website.ejs`, );
      // Simulate an Express response object
      const htmlRes = {
        setHeader: (key, value) => {
          console.log(`Setting header: ${key} = ${value}`);
        },
      };

      const html = await renderEjsTemplateWithData(templatePath, data, htmlRes);
      const privacy_html = await renderEjsTemplateWithData(templatePrivacyPath, data, htmlRes);
      const page_privacy_policy = "page.privacy-policy.liquid";

      const return_policy_html = await renderEjsTemplateWithData(templateReturnPath, data, htmlRes);
      const page_return_policy = "page.return-policy.liquid";

      const term_policy_html = await renderEjsTemplateWithData(templateTermsPath, data, htmlRes);
      const page_terms_policy = "page.terms-policy.liquid";
      //  console.log(return_Policy_html);
      //  console.log(term_policy_html);
      var options_2 = await renderConfig(req, page_privacy_policy, privacy_html);
      const response_2 = await makeRequest(options_2);
      var options_3 = await renderConfig(req, page_return_policy, return_policy_html);
      const response_3 = await makeRequest(options_3);
      var options_4 = await renderConfig(req, page_terms_policy, term_policy_html);
      const response_4 = await makeRequest(options_4);
      // console.log(privacyPageResponse);
      // return false;

      var options_1 = {
        method: "GET",
        url: `https://${req.body.storename}.myshopify.com/admin/api/2023-10/themes/${req.body.theme_id}/assets.json?asset[key]=sections/header.liquid`,
        headers: {
          "X-Shopify-Access-Token": req.body.access_token,
          "Content-Type": "application/json",
        },
      };

      var request = require("request");
      var options = {
        method: "PUT",
        url: `https://${req.body.storename}.myshopify.com/admin/api/2023-10/themes/${req.body.theme_id}/assets.json`,
        headers: {
          "X-Shopify-Access-Token": req.body.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: {
            key: "snippets/customWebsite.liquid",
            value: html,
          },
        }),
      };

      var options_2 = {
         method: "PUT",
         url: `https://${req.body.storename}.myshopify.com/admin/api/2023-10/themes/${req.body.theme_id}/assets.json`,
         headers: {
           "X-Shopify-Access-Token": req.body.access_token,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           asset: {
             key: `templates/${page_privacy_policy}`,
             value: privacy_html,
           },
         }),
       };

      const apiResponse = await updateStoreTheme(req, res, options, options_1);

    
  } catch (error) {
    res.status(200).json({
      status: "error",
      message: "please uplod store logo .zip file!",
      error,
    });
  }
};

const senMailToUser = async (req, res) => {
try {
  const myData = {
    email:req.query.access_token_email
  };
  console.log("--here--");
  await new Sendmail(myData).sendWelcome();

  res.status(200).json({
    status: "success",
    message: "Email Sent",
  });

} catch (error) {
  console.log(error,'===================errror==============')
}
};



const getStore = async (req, res) => {
  try {
    var options = {
      method: "GET",
      url: `https://${req.query.storename}.myshopify.com/admin/api/2021-07/shop.json`,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": req.query.access_token,
      },
    };

    console.log(options);
    request(options, function (error, resp) {
      console.log(resp);
      if (error) {
        res.status(200).json({
          status: "error",
          message: "storename empty or enter without any space!",
        });
      } else {
        var response = JSON.parse(resp.body);

        if (response.errors) {
          res.status(200).json({
            status: "error",
            message: "Please check your storename and api access token!",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "store connected successfully.",
          });
        }
      }
    });

    // res.json({ message: "Hello from server test!" });
  } catch (error) {
    console.log(error, "================error================ ");
  }
};

module.exports = {
  storeSaves,
  getStore,
  senMailToUser,
};
