//utworzenie schematu wiadomości

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: { type: String, required: [true, "Pole tytuł nie może być puste"] },
  description: { type: String, required: [true, "Pole opis nie może być puste"] },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);    //eksport modelu/schematu wiadomości