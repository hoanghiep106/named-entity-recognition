## This directory helps to infer tweet's location using some inference techniques. (Still in development)

### Requirement
* Node
* MongoDB
* Tweets and users collections in MongoDB (same as tweets and users object defined by Twitter)

### How to run
* Follow the instructions and download Stanford NER at https://nlp.stanford.edu/software/CRF-NER.shtml
* Copy the stanford-ner-server.sh to Stanford NER's directory just downloaded
* Start the stanford-ner server inside Stanford NER's directory (you can choose one of three classifiers in the stanford-ner-server.sh before run the commands):
```
sh ./ner-server.sh
```
* Install dependencies:
```
npm i
```
* Start infer your tweets:
```
npm start
```

## Credits:
* Stanford NER project: https://nlp.stanford.edu/software/CRF-NER.shtml
* Node client for Stanford NER: https://github.com/niksrc/ner
* Node google geocoder: https://github.com/nchaulet/node-geocoderd
