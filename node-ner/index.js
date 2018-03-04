const ner = require('ner');

const text = 'Wikipedia is a free-access, free-content Internet encyclopedia, supported and hosted by the non-profit Wikimedia Foundation. Those who can access the site can edit most of its articles.[5] Wikipedia is ranked among the ten most popular websites,[4] and constitutes the Internets largest and most popular general';

ner.get({
	port:8080,
	host:'localhost'
}, text, function(err, res){
  if(res && res.entities) {
    console.log(res.entities.LOCATION);
  }
});
