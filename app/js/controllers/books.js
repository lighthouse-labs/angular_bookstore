
/*================================================================
=>                  Controller = Books
==================================================================*/
/*global app*/

app.controller('BooksCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

	'use strict';

	console.log('Controller ===  BooksCtrl');

  // Using $stateParams we can access url params
  console.log('The store id is', $stateParams.store_id);

  // Hardcode $scope.books. This data could just as easily have come from an API though...
  $scope.stores = [
    {id: 1, name: "Burnaby", books: [
      {id: 2, title: "My Name is Red", author: "Orhan Pamuk", description: "The novel, concerning miniaturists in the Ottoman Empire of 1591, established Pamuk's international reputation and contributed to his Nobel Prize.", price: 24.99},
      {id: 3, title: "The Man Who Disappeared", author: "Franz Kafka", description: "Kafka's first and funniest novel, Amerika tells the story of the young immigrant Karl Rossmann who, after an embarrassing sexual misadventure, finds himself 'packed off to America' by his parents.", price: 24.99},
      {id: 5, title: "Into Thin Air", author: "Jon Krakauer", description: "Into Thin Air is a riveting first-hand account of a catastrophic expedition up Mount Everest. In March 1996, Outside magazine sent veteran journalist and seasoned climber Jon Krakauer on an expedition led by celebrated Everest guide Rob Hall. Despite the expertise of Hall and the other leaders, by the end of summit day eight people were dead.", price: 24.99}
    ]},
    {id: 2, name: "Vancouver", books: [
      {id: 1, title: "Snow Crash", author: "Neal Stephenson", description: "Snow Crash is Neal Stephenson's third novel, published in 1992. Like many of Stephenson's other novels it covers history, linguistics, anthropology, archaeology, religion, computer science, politics, cryptography, memetics and philosophy.", price: 24.99},
      {id: 2, title: "My Name is Red", author: "Orhan Pamuk", description: "The novel, concerning miniaturists in the Ottoman Empire of 1591, established Pamuk's international reputation and contributed to his Nobel Prize.", price: 24.99},
      {id: 3, title: "The Man Who Disappeared", author: "Franz Kafka", description: "Kafka's first and funniest novel, Amerika tells the story of the young immigrant Karl Rossmann who, after an embarrassing sexual misadventure, finds himself 'packed off to America' by his parents.", price: 24.99},
      {id: 4, title: "Monsignor Quixote", author: "Graham Greene", description: "The title character of Monsignor Quixote is a village priest, elevated to the rank of monsignor through a clerical error, who travels to Madrid accompanied by his best friend, Sancho, the Communist ex-mayor of the village, in Greene's lighthearted variation on Cervantes.", price: 24.99},
      {id: 5, title: "Into Thin Air", author: "Jon Krakauer", description: "Into Thin Air is a riveting first-hand account of a catastrophic expedition up Mount Everest. In March 1996, Outside magazine sent veteran journalist and seasoned climber Jon Krakauer on an expedition led by celebrated Everest guide Rob Hall. Despite the expertise of Hall and the other leaders, by the end of summit day eight people were dead.", price: 24.99}
    ]},
    {id: 3, name: "Nanaimo", books: [
      {id: 1, title: "Snow Crash", author: "Neal Stephenson", description: "Snow Crash is Neal Stephenson's third novel, published in 1992. Like many of Stephenson's other novels it covers history, linguistics, anthropology, archaeology, religion, computer science, politics, cryptography, memetics and philosophy.", price: 24.99},
      {id: 2, title: "My Name is Red", author: "Orhan Pamuk", description: "The novel, concerning miniaturists in the Ottoman Empire of 1591, established Pamuk's international reputation and contributed to his Nobel Prize.", price: 24.99},
      {id: 5, title: "Into Thin Air", author: "Jon Krakauer", description: "Into Thin Air is a riveting first-hand account of a catastrophic expedition up Mount Everest. In March 1996, Outside magazine sent veteran journalist and seasoned climber Jon Krakauer on an expedition led by celebrated Everest guide Rob Hall. Despite the expertise of Hall and the other leaders, by the end of summit day eight people were dead.", price: 24.99}
    ]}
  ];

  // use lodash to retrieve the books for the current store
  $scope.store = _($scope.stores).where({'id': parseInt($stateParams.store_id)}).first();
  $scope.books = $scope.store.books || [];


}]);


/*-----  End of Controller = Books  ------*/



