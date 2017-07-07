angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            return {

                getPokemons: function() {
                    return $http.get('data/pokemons.json');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('data/pokemon.' + pokemonId + '.json');
                },
				
				createPokemon: function(pokemonData) {
					return $http({
						method: 'PUT',
						url: 'https://api.backendless.com/A7DA2047-422B-6827-FF00-D1DEE2E56F00/7FF2868B-2DE1-5BD4-FFF5-082A8651E400/data/pokemons',
						/*headers: {
							'application-id': 'A7DA2047-422B-6827-FF00-D1DEE2E56F00',
							'secret-key': '0667B591-9B80-1C6E-FF4F-608273F66000'
						},*/
						data: pokemonData
					})
				}

            }

        }

    );
