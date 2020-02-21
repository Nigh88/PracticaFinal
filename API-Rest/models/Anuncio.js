const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    name: String,     
    sell: Boolean,     
    price: Number, 
    photo: String,
    description: String,     
    tags: [String] 
}); 

anuncioSchema.statics.list = function({filter, skip, limit, sort}) {
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    return query.exec();
  }

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;