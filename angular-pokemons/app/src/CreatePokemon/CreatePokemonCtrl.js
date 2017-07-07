'use strict';

pokemonApp.controller('CreatePokemonCtrl', function($scope, PokemonsService) {

    $scope.newPokemon = {};
    $scope.addPokemon = function(myPokemon) {
        console.log(myPokemon);
		PokemonsService.createPokemon(myPokemon).then(function(pokemonData) {
			$scope.pokemon = pokemonData.data;
		});
	
        $scope.newPokemon = {};
    };

});
