//utworzenie schematu wiadomości

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);    //eksport modelu/schematu wiadomości