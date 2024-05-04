const fs = require('fs').promises; // 使用 fs 的 promise 版本
// const fetch = require('node-fetch'); // 确保已安装 node-fetch

async function getPokemon(num) {
    try {
        var url = 'https://pokeapi.co/api/v2/pokemon/' + num;
        var res = await fetch(url);
        var pokemon = await res.json();
        let pokemonType = pokemon['types'];
    
        let pokemonImg = pokemon['sprites']['front_default'];
        res = await fetch(pokemon['species']['url']);
        let pokemonDesc = await res.json();
        let zh_desc = pokemonDesc['flavor_text_entries'].find(e => e['language']['name'] === 'zh-Hans');
        let en_desc = pokemonDesc['flavor_text_entries'][9];
    
        let zh_name = pokemonDesc['names'].find(e => e['language']['name'] === 'zh-Hans')['name'];
        let en_name = pokemonDesc['names'].find(e => e['language']['name'] === 'en')['name'];
    
        return { zh_name, zh_desc, en_name, en_desc, num, pokemonType, pokemonImg };
    } catch (error) {
        console.error('Failed to fetch data for pokemon number', num, error);
        return null; // 返回null或相应的错误处理
    }
}

var pokedex = {};

async function main() {
    for (let i = 1; i <= 151; i++) {
        const pokemon = await getPokemon(i);
        if (pokemon) {
            pokedex[i] = pokemon;
            console.log(i);
        }
    }

    try {
        await fs.writeFile('pokedex.json', JSON.stringify(pokedex, null, 2));
        console.log('Pokedex has been written successfully.');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

main();
