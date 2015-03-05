/*jslint node: true */
'use strict';

var crypto = require('crypto');

module.exports = {
    
     defaultAlgorithm: 'aes-256-cbc',
     defaultFormat: 'hex',
     ivLength: 16,

     encrypt : function(data, key){
          var algorithm = this.defaultAlgorithm;
          var format = this.defaultFormat;
         
          var iv = crypto.randomBytes(this.ivLength);

          var cipher = crypto.createCipheriv(algorithm, new Buffer(key, 'hex'), iv);
          var encrypted = cipher.update(data, 'utf8', format) + cipher.final(format);
          //put the vector at the beginning
          return iv.toString('hex') + encrypted;
     },

     decrypt :     function(data, key){
          var algorithm = this.defaultAlgorithm;
          var format = this.defaultFormat;

          var ivLength = this.ivLength * 2;

          var iv = new Buffer(data.substring(0, ivLength), 'hex');
          //get the vector from the begging of the string, hex is twice length the string
          data = data.substring(ivLength);

          var decipher = crypto.createDecipheriv(algorithm, new Buffer(key, 'hex'), iv);
          var decrypted = decipher.update(data, format, 'utf8') + decipher.final('utf8');

          return decrypted;
     }
};