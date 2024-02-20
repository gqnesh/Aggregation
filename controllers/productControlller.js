const ProductModel = require('../models/product.js');

class ProductController {
  static testMethod = async (req, res) => {

    // console.log(`${testMethod}..`, req.query);
    console.log('testMethod...');
    res.send('Test Done');
  }




  static getALlProductsTesting = async (req, res) => {
    const { info } = req.query;
    const myData = await ProductModel.find({ company: info });
    // const myData = await ProductModel.insertMany([
    //   {
    //     "name": "Iphone13 Pro Max",
    //     "price": 119000,
    //     "featured": true,
    //     "rating": 4.3,
    //     "company": "Apple"
    //   },
    //   {
    //     "name": "Samsung S22 Ultra",
    //     "price": 125000,
    //     "featured": true,
    //     "rating": 4.4,
    //     "company": "Samsung"
    //   },
    //   {
    //     "name": "Honor 13 Pro",
    //     "price": 58000,
    //     "featured": true,
    //     "rating": 4,
    //     "company": "Honor"
    //   },
    //   {
    //     "name": "Oppo Reno 15",
    //     "price": 40,
    //     "featured": false,
    //     "rating": 4,
    //     "company": "Oppo"
    //   },
    //   {
    //     "name": "Redmi 11",
    //     "price": 16000,
    //     "featured": false,
    //     "rating": 3.0,
    //     "company": "MI"
    //   },
    //   {
    //     "name": "Realme 9 Pro",
    //     "price": 14000,
    //     "featured": false,
    //     "rating": 3.1,
    //     "company": "Realme"
    //   },
    //   {
    //     "name": "POCO",
    //     "price": 15000,
    //     "featured": false,
    //     "rating": 2.9,
    //     "company": "POCO"
    //   }
    // ]);

    console.log(myData);
    res.status(200).send({
      success: true,
      data: myData
    })
  }

  static getData = async (req, res) => {
    const { company, name, sort, select } = req.query;
    const queryObject = {};
    //return all data if company parameter is not passed
    if (company) {
      queryObject.company = company;
    }

    //MongoDB offers an improved full-text search solution, Atlas Search , which has its own $regex operator
    //Provides regular expression capabilities for pattern matching strings in queries.
    //Syntax:

    // {
    //   <field>: {$regex: /pattern/, $options: '<options>' } }
    //     {<field>: {$regex: 'pattern', $options: '<options>' } }
    //       $options:

    //       In MongoDB, the following <options> are available for use with regular expression:

    //         i: To match both lower case and upper case pattern in the string.
    //         m: To include ^ and $ in the pattern in the match i.e. to specifically search for ^ and $ inside the string. Without this option, these anchors match at the beginning or end of the string.
    //         x: To ignore all white space characters in the $regex pattern.
    //         s: To allow the dot character “.” to match all characters including newline characters

    //we are displaying the documents of those employees whose position field contain case-insensitive “software” string. So, we pass a regular expression with option(i.e., {$regex : “software”, $options: “$i”}) for the position field in the find() method. In the regular expression, $options:”$i” is used to match both lower case and upper case pattern in the given string(i.e., “software”).

    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }

    let DBQuery = ProductModel.find(queryObject);

    if (sort) {
      let sortFix = sort.replace(',', " ");
      DBQuery = ProductModel.find(queryObject).sort(sortFix)
    }

    if (select) {
      // let selectFix = select.replace(',', ' ');
      let selectFix = select.split(',').join(' ');
      console.log(selectFix)
      DBQuery = ProductModel.find(queryObject).select(selectFix)
    }

    const myData = await DBQuery;
    res.status(200).send({
      succcess: true,
      myData
    })

  }

  static pagination = async (req, res) => {
    const { price, name, company, sort } = req.query;
    let queryObject = {}
    let DBQuery = ProductModel.find(queryObject);

    let page = req.query.page || 1;
    let limitForData = req.query.limit || 3;
    let skip = (page - 1) * limitForData;

    if (price) {
      queryObject.price = price;
    }
    if (name) {
      queryObject.name = name;
    }
    if (company) {
      queryObject.company = company;
    }

    DBQuery = ProductModel.find(queryObject);
    
    if (sort) {
      let sortFix = sort.split(',').join(" ");
      DBQuery = ProductModel.find().sort(sortFix)
    }

    const getData = await DBQuery.skip(skip).limit(limitForData);

    res.status(200).send({
      success: true,
      getData,
      key: sort,
      totalData: getData.length
    })

  }

}

module.exports = ProductController;
