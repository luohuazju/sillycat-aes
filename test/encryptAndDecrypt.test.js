/*jslint node: true */
'use strict';

require("should");
var crypto = require('crypto');
var AESTool = require('../index').Aes;

describe("Encrypt&Decrypt String", function(){
     it("should encrypt&decrypt string password", function(){
          console.log("");
          var key = crypto.randomBytes(32);
          var raw_data = "I love nodejs, I used to use javascript for a long time!";
          var secret_data = AESTool.encrypt(raw_data, key);
          console.log("raw_data is    = " + raw_data);
          console.log("secret data is = " + secret_data);
          var decrypt_data = AESTool.decrypt(secret_data, key);
          console.log("decrypt data is= " + decrypt_data);
          decrypt_data.should.equal(raw_data);
     });
});