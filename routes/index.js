//declaring my variables that I will be using.
var express = require('express');
var router = express.Router();
var cardnumber = 0;
var amount = 0;
var i;
var wallet
//since a  same card should never be shared with more than 1 user (but a wallet can be used by multiple users over time)
//and we are dealing with money I added a condition if in the past the same card number was generated before
var oldcards
//at any point the wallet can have only one card.
wallet[0] = cardnumber
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });
});
/* asked the user for his/her card number so i can check if the card is already registed.
if its registered then i make the card change event to save shakepay the costs of generating new card
else i request a new card*/
router.post('/test/submit', function(req, res, next) {
  var cardnumberpassed = req.body.cardnumber;
  //changing the card number 
  if (cardnumberpassed == cardnumber){
    router.get('/cardCharged/cardNumber', function(req, res, next) {
    res.render('test', {output: req.params.cardnumber});
    //When a card is charged, the whole amount in the wallet goes to zero. and since there is only one card and one 
    //wallet then there is only one amount. (from what I understandthere is no need to link the amount to the card in this exercise)
    amount = 0;
    cardnumber = Math.floor(Math.random() * 1000000000000);
    oldcards.push(cardnumber);
    //before pushing the new card to wallet we make sure that its unique and never been generated before.
    for(i=0; i<oldcards.length; i++){
      if(oldcards[i]==cardnumber){
        cardnumber = Math.floor(Math.random() * 1000000000000);
      }
    }
    //adding the card to the wallet.
    //from my understanding a wallet can only have one card number and since i only set the first index to the cardnumber.
    wallet[0] = cardnumber
    //
    res.send("the card has been changed");


});
  }
  //requesting a new card
  else {
    router.get('/giveMeCard/:amount', function(req, res, next) {
    res.render('test', {output: req.params.amount});
    amount = req.params.amount;
    cardnumber = Math.floor(Math.random() * 10000000000000000);
    oldcards.push(cardnumber);
    for(i=0; i<oldcards.length; i++){
      if(oldcards[i]==cardnumber){
        cardnumber = Math.floor(Math.random() * 1000000000000);
      }
    }
    wallet[0] = cardnumber
    res.send("card number is $(cardnumber)")

});
  } 
});

module.exports = router;
