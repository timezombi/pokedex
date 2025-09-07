"use client";
import React, { useState, useMemo, useEffect } from "react";

const REGIONS = [
  { name: "Kanto", map: "/regions/kanto.png" },
  { name: "Johto", map: "/regions/johto.png" },
  { name: "Hoenn", map: "/regions/hoenn.png" },
  { name: "Sinnoh", map: "/regions/sinnoh.png" },
  { name: "Unova", map: "/regions/unova.png" },
  { name: "Kalos", map: "/regions/kalos.png" },
  { name: "Alola", map: "/regions/alola.png" },
  { name: "Galar", map: "/regions/galar.png" },
  { name: "Paldea", map: "/regions/paldea.png" },
];

// Pokemon names array (first 1025 Pokemon) - Complete list
const POKEMON_NAMES = [
  // Generation 1 - Kanto (1-151)
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise",
  "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
  "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash",
  "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales",
  "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth",
  "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine",
  "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel",
  "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton",
  "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar",
  "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak",
  "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
  "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
  "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon",
  "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres",
  "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew",
  
  // Generation 2 - Johto (152-251)
  "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr",
  "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat",
  "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos",
  "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora",
  "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig",
  "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross",
  "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird",
  "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue",
  "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar",
  "Lugia", "Ho-oh", "Celebi",
  
  // Generation 3 - Hoenn (252-386)
  "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert",
  "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo",
  "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain",
  "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud",
  "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron",
  "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot",
  "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon",
  "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt",
  "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette",
  "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl",
  "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross",
  "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys",
  
  // Generation 4 - Sinnoh (387-493)
  "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon",
  "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Budew", "Roserade",
  "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Burmy", "Wormadam", "Mothim", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel",
  "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Mismagius", "Honchkrow", "Glameow", "Purugly",
  "Chingling", "Stunky", "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr.", "Happiny", "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp",
  "Munchlax", "Riolu", "Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon",
  "Mantyke", "Snover", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega",
  "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Probopass", "Dusknoir", "Froslass", "Rotom", "Uxie", "Mesprit", "Azelf",
  "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus",
  
  // Generation 5 - Unova (494-649)
  "Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott",
  "Patrat", "Watchog", "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour",
  "Munna", "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika", "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur", "Excadrill",
  "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole", "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon", "Leavanny", "Venipede", "Whirlipede", "Scolipede",
  "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Basculin", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Maractus", "Dwebble", "Crustle", "Scraggy", "Scrafty",
  "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Trubbish", "Garbodor", "Zorua", "Zoroark", "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle",
  "Solosis", "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish", "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier", "Foongus", "Amoonguss",
  "Frillish", "Jellicent", "Alomomola", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang", "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem",
  "Litwick", "Lampent", "Chandelure", "Axew", "Fraxure", "Haxorus", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo", "Mienshao", "Druddigon",
  "Golett", "Golurk", "Pawniard", "Bisharp", "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona",
  "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram", "Zekrom", "Landorus", "Kyurem", "Keldeo", "Meloetta", "Genesect",
  
  // Generation 6 - Kalos (650-721)
  "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling", "Fletchinder", "Talonflame",
  "Scatterbug", "Spewpa", "Vivillon", "Litleo", "Pyroar", "Flabébé", "Floette", "Florges", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Espurr", "Meowstic", "Honedge", "Doublade", "Aegislash",
  "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum",
  "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Bergmite", "Avalugg",
  "Noibat", "Noivern", "Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa", "Volcanion",
  
  // Generation 7 - Alola (722-809)
  "Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Grubbin", "Charjabug", "Vikavolt",
  "Crabrawler", "Crabominable", "Oricorio", "Cutiefly", "Ribombee", "Rockruff", "Lycanroc", "Wishiwashi", "Mareanie", "Toxapex", "Mudbray", "Mudsdale", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic",
  "Salandit", "Salazzle", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Oranguru", "Passimian", "Wimpod", "Golisopod", "Sandygast", "Palossand", "Pyukumuku", "Type: Null", "Silvally",
  "Minior", "Komala", "Turtonator", "Togedemaru", "Mimikyu", "Bruxish", "Drampa", "Dhelmise", "Jangmo-o", "Hakamo-o", "Kommo-o", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala",
  "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow", "Poipole", "Naganadel", "Stakataka", "Blacephalon", "Zeraora", "Meltan", "Melmetal",
  
  // Generation 8 - Galar (810-898)
  "Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace", "Sobble", "Drizzile", "Inteleon", "Skwovet", "Greedent", "Rookidee", "Corvisquire", "Corviknight", "Blipbug", "Dottler", "Orbeetle",
  "Nickit", "Thievul", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Chewtle", "Drednaw", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal", "Applin", "Flapple", "Appletun", "Silicobra", "Sandaconda",
  "Cramorant", "Arrokuda", "Barraskewda", "Toxel", "Toxtricity", "Sizzlipede", "Centiskorch", "Clobbopus", "Grapploct", "Sinistea", "Polteageist", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl",
  "Obstagoon", "Perrserker", "Cursola", "Sirfetch'd", "Mr. Rime", "Runerigus", "Milcery", "Alcremie", "Falinks", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue", "Indeedee", "Morpeko", "Cufant", "Copperajah",
  "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Duraludon", "Dreepy", "Drakloak", "Dragapult", "Zacian", "Zamazenta", "Eternatus", "Kubfu", "Urshifu", "Zarude", "Regieleki", "Regidrago", "Glastrier", "Spectrier",
  "Calyrex", "Wyrdeer", "Kleavor", "Ursaluna", "Basculegion", "Sneasler", "Overqwil", "Enamorus", "Sprigatito", "Floragato", "Meowscarada", "Fuecoco", "Crocalor", "Skeledirge", "Quaxly", "Quaxwell", "Quaquaval",
  "Lechonk", "Oinkologne", "Dudunsparce", "Tandemaus", "Maushold", "Fidough", "Dachsbun", "Smoliv", "Dolliv", "Arboliva", "Squawkabilly", "Nacli", "Naclstack", "Garganacl", "Charcadet", "Armarouge", "Ceruledge",
  "Tadbulb", "Bellibolt", "Wattrel", "Kilowattrel", "Maschiff", "Mabosstiff", "Shroodle", "Grafaiai", "Bramblin", "Brambleghast", "Toedscool", "Toedscruel", "Klawf", "Capsakid", "Scovillain", "Rellor", "Rabsca",
  "Flittle", "Espathra", "Tinkatink", "Tinkatuff", "Tinkaton", "Wiglett", "Wugtrio", "Bombirdier", "Finizen", "Palafin", "Varoom", "Revavroom", "Cyclizar", "Orthworm", "Glimmet", "Glimmora", "Greavard", "Houndstone",
  "Flamigo", "Cetoddle", "Cetitan", "Veluza", "Dondozo", "Tatsugiri", "Annihilape", "Clodsire", "Farigiraf", "Dudunsparce", "Kingambit", "Great Tusk", "Scream Tail", "Brute Bonnet", "Flutter Mane", "Slither Wing", "Sandy Shocks",
  "Iron Treads", "Iron Bundle", "Iron Hands", "Iron Jugulis", "Iron Moth", "Iron Thorns", "Frigibax", "Arctibax", "Baxcalibur", "Gimmighoul", "Gholdengo", "Wo-Chien", "Chien-Pao", "Ting-Lu", "Chi-Yu", "Roaring Moon",
  "Iron Valiant", "Koraidon", "Miraidon", "Walking Wake", "Iron Leaves", "Dipplin", "Poltchageist", "Sinistcha", "Okidogi", "Munkidori", "Fezandipiti", "Ogerpon", "Archaludon", "Hydrapple", "Gouging Fire", "Raging Bolt",
  "Iron Boulder", "Iron Crown", "Terapagos", "Pecharunt"
];

// Complete Pokemon dataset with proper region assignments
const POKEMON = [
  // Kanto (1-151)
  ...Array.from({ length: 151 }, (_, i) => ({
    id: i + 1,
    name: POKEMON_NAMES[i] || `Pokemon ${i + 1}`,
    region: "Kanto",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 1}.png`,
  })),
  // Johto (152-251)
  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 152,
    name: POKEMON_NAMES[i + 151] || `Pokemon ${i + 152}`,
    region: "Johto",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 152}.png`,
  })),
  // Hoenn (252-386)
  ...Array.from({ length: 135 }, (_, i) => ({
    id: i + 252,
    name: POKEMON_NAMES[i + 251] || `Pokemon ${i + 252}`,
    region: "Hoenn",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 252}.png`,
  })),
  // Sinnoh (387-493)
  ...Array.from({ length: 107 }, (_, i) => ({
    id: i + 387,
    name: POKEMON_NAMES[i + 386] || `Pokemon ${i + 387}`,
    region: "Sinnoh",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 387}.png`,
  })),
  // Unova (494-649)
  ...Array.from({ length: 156 }, (_, i) => ({
    id: i + 494,
    name: POKEMON_NAMES[i + 493] || `Pokemon ${i + 494}`,
    region: "Unova",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 494}.png`,
  })),
  // Kalos (650-721)
  ...Array.from({ length: 72 }, (_, i) => ({
    id: i + 650,
    name: POKEMON_NAMES[i + 649] || `Pokemon ${i + 650}`,
    region: "Kalos",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 650}.png`,
  })),
  // Alola (722-809)
  ...Array.from({ length: 88 }, (_, i) => ({
    id: i + 722,
    name: POKEMON_NAMES[i + 721] || `Pokemon ${i + 722}`,
    region: "Alola",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 722}.png`,
  })),
  // Galar (810-898)
  ...Array.from({ length: 89 }, (_, i) => ({
    id: i + 810,
    name: POKEMON_NAMES[i + 809] || `Pokemon ${i + 810}`,
    region: "Galar",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 810}.png`,
  })),
  // Paldea (906-1025) - Note: Some IDs are missing in the sequence
  ...Array.from({ length: 120 }, (_, i) => ({
    id: i + 906,
    name: POKEMON_NAMES[i + 905] || `Pokemon ${i + 906}`,
    region: "Paldea",
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 906}.png`,
  })),
];

// Individual Pokemon Card Component with optimized loading and animations
function PokemonCard({ pokemon, index }: { pokemon: { id: number; name: string; region: string; sprite: string }; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Stagger the visibility based on index for smooth animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 20); // Slightly slower for smoother effect

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`flex flex-col items-center p-1 transition-all duration-500 ${
        isVisible && isLoaded 
          ? 'opacity-100 transform scale-100 translate-y-0' 
          : 'opacity-0 transform scale-75 translate-y-8'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
        loading="lazy"
        onLoad={() => {
          // Small delay to ensure smooth animation
          setTimeout(() => setIsLoaded(true), 100);
        }}
        onError={() => {
          // Handle missing images gracefully
          setIsLoaded(true);
        }}
      />
    </div>
  );
}

export default function Home() {
  const [region, setRegion] = useState("Kanto");
  const [bg, setBg] = useState(REGIONS[0].map);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllPokemon, setShowAllPokemon] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Set<number>>(new Set());

  const regionPokemon = useMemo(
    () => POKEMON.filter((p) => p.region === region),
    [region]
  );

  const filtered = useMemo(() => {
    let pokemon = regionPokemon;
    
    // Filter by search term
    if (searchTerm) {
      pokemon = pokemon.filter((p) => 
        p.id.toString().includes(searchTerm) || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selection
    if (!showAllPokemon) {
      pokemon = pokemon.filter((p) => selectedPokemon.has(p.id));
    }
    
    return pokemon;
  }, [regionPokemon, searchTerm, showAllPokemon, selectedPokemon]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white overflow-hidden">
      {/* Region Map Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center opacity-60 transition-all duration-500"
        style={{ 
          backgroundImage: `url(${bg})`,
          zIndex: 0
        }}
      />
      
      <div className="w-full max-w-5xl mx-auto p-4 relative z-10">
        <h1 className="text-3xl font-bold mb-4 text-center drop-shadow-lg">Pokémon Shiny Home Animation Showcase</h1>
        
        {/* Region Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {REGIONS.map((r) => (
            <button
              key={r.name}
              className={`px-3 py-1 rounded-full border border-white/30 transition-all ${
                region === r.name ? "bg-white text-gray-900 font-bold" : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => {
                setRegion(r.name);
                setBg(r.map);
              }}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Pokémon name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/60"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showAllPokemon}
                onChange={(e) => setShowAllPokemon(e.target.checked)}
                className="rounded"
              />
              Show All Pokémon
            </label>
          </div>

          {/* Quick Selection Buttons */}
          {!showAllPokemon && (
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPokemon(new Set(regionPokemon.map(p => p.id)))}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedPokemon(new Set())}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Pokemon Selection Grid (when not showing all) */}
        {!showAllPokemon && (
          <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-center">Select Pokémon to Show</h3>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2 max-h-40 overflow-y-auto">
              {regionPokemon.map((poke) => (
                <label key={poke.id} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPokemon.has(poke.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedPokemon);
                      if (e.target.checked) {
                        newSelected.add(poke.id);
                      } else {
                        newSelected.delete(poke.id);
                      }
                      setSelectedPokemon(newSelected);
                    }}
                    className="sr-only"
                  />
                  <div className={`w-8 h-8 rounded border-2 transition-colors ${
                    selectedPokemon.has(poke.id) 
                      ? 'border-green-400 bg-green-400/20' 
                      : 'border-gray-600 bg-gray-700/50'
                  }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={poke.sprite}
                      alt={`Pokemon ${poke.id}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs mt-1">{poke.id}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Animated Pokemon Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
          {filtered.map((poke, idx) => (
            <PokemonCard 
              key={poke.id} 
              pokemon={poke} 
              index={idx} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
