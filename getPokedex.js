const fs=require('fs');

async function getPokemon(num){
    var url = 'https://pokeapi.co/api/v2/pokemon/' + num ;
    var res = await fetch(url);
    var pokemon= await res.json();
    let pokemonType = pokemon['types'];

    let pokemonImg = pokemon['sprites']['front_default'];
    res = await fetch(pokemon['species']['url']);
    let pokemonDesc = await res.json();
    let zh_desc = pokemonDesc['flavor_text_entries'].find(e=>e['language']['name']=='zh-Hans');
    let en_desc = pokemonDesc['flavor_text_entries'][9];

    let zh_name = pokemonDesc['names'].find(e=>e['language']['name']=='zh-Hans')['name'];
    let en_name = pokemonDesc['names'].find(e=>e['language']['name']=='en')['name'];


    // document.getElementById('pokemon-description').innerHTML=zh_name + '<br>' + (zh_desc?zh_desc['flavor_text']:en_desc['flavor_text']);
    // console.log(pokemonDesc)

    pokedex[num] = {zh_name,zh_desc,en_name,en_desc,num,pokemonType,pokemonImg};
}

var pokedex={};
const pokemonCount=151;

async function main(){
    for(let i=1;i<pokemonCount;i++){
        await getPokemon(i);
    }

    await fs.writeFile('pokedex.json',JSON.stringify(pokedex),err=>{})
}

main();
console.log(pokedex);

