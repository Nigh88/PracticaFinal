const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
    name: String,     
    sell: Boolean,     
    price: Number, 
    photo: String,
    description: String,     
    tags: [String],
    owner: String 
}); 

advertSchema.statics.list = function({filter, skip, limit, sort}) {
    const query = Advert.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    return query.exec();
  }

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;