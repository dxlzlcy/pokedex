const pokemonCount = 151;
var pokedex={};
let pokemon; 
let pokemonJson;
let activeItem

window.onload = async function(){
    for(let i=1;i<=pokemonCount;i++){
        await getPokemon(i);
        let div = document.createElement('div');
        div.classList.add('pokemonName');
        div.id = i;
        div.innerText = i + '.' + pokedex[i].zh_name;
        div.addEventListener('click',function(){
            pokemonImg.src = pokedex[i].pokemonImg;
            pokemonImgBack.src = pokedex[i].pokemonImgBack;
            while(pokemonTypes.firstChild){
                pokemonTypes.firstChild.remove();
            }
            for(let type of pokedex[i].pokemonType){
                x = document.createElement('span');
                x.innerText = type.type.name.toUpperCase();
                x.classList.add(type.type.name);
                x.classList.add('type-box');

                pokemonTypes.appendChild(x);
            }
            pokemonDescription.innerHTML = pokedex[i].zh_desc.flavor_text + '<br>' + pokedex[i].en_desc.flavor_text
            pokemonName.innerHTML = i+'.' + pokedex[i].zh_name + '<br>' + pokedex[i].en_name;
            this.style.backgroundColor='cyan';
            if(activeItem && activeItem!=this){
                activeItem.style.backgroundColor='white';
            }
            activeItem = this;
        })
        if(i==2){
            pokemonList.firstChild.click();
        }
        pokemonList.append(div);
    }

}


async function getPokemon(num){
    var url = 'https://pokeapi.co/api/v2/pokemon/' + num ;
    var res = await fetch(url);
    pokemonJson= await res.json();
    let pokemonType = pokemonJson['types'];

    let pokemonImg = pokemonJson['sprites']['front_default'];
    let pokemonImgBack = pokemonJson['sprites']['back_default'];

    res = await fetch(pokemonJson['species']['url']);
    let pokemonDesc = await res.json();
    let zh_desc = pokemonDesc['flavor_text_entries'].find(e=>e['language']['name']=='zh-Hans');
    let en_desc = pokemonDesc['flavor_text_entries'][9];

    let zh_name = pokemonDesc['names'].find(e=>e['language']['name']=='zh-Hans')['name'];
    let en_name = pokemonDesc['names'].find(e=>e['language']['name']=='en')['name'];


    pokedex[num] = {zh_name,zh_desc,en_name,en_desc,num,pokemonType,pokemonImg,pokemonImgBack};


}


