const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
//Récupération du paramètre d'identification du produit choisi dans l'adresse du navigateur


fetch("http://localhost:3000/api/products/" + id)
// une reponse de la bonne réception du lien + ajout de identifiant du produit
.then ((response) => {
    return response.json(); 
    // traduit en JSON : tableau contenant des objets
})

.then((product) => {
    const image = document.querySelector('.item__img');
    const titre = document.querySelector('#title');
    const prix = document.querySelector('#price');
    const description = document.querySelector('#description');
    const colorId = document.querySelector('#colors');

    image.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;
    titre.innerHTML = `${product.name}`;
    prix.innerHTML = `${product.price}`;
    description.innerHTML = `${product.description}`;

    const colorsArray = product.colors;
    for (const color of colorsArray){
        colorId.innerHTML += `<option value="${color}">${color}</option>`;
        //Affectation après addition (+=) :permet de concaténer les possibilités des options de couleur 
}
//Boucle for permettant de parcourir un tableau 
addCart();

});
// On injecte les infos dans le HTML






//--Ajout du produit et ses infos au localstorage--//



function addCart(){
    
    //Définition des champs à renseigner
    const btnAdd = document.querySelector('#addToCart');
    const color = document.querySelector('#colors');
    const quantity = document.querySelector('#quantity');

    btnAdd.addEventListener('click', () => {
        //color.value !== "" && (quantity.value > 1 && quantity.value < 100))
        if (!color.value){
            alert('veuillez choisir une couleur');
            return;
        }
        if(quantity.value < 1 || quantity.value > 100) {
            alert('veuillez choisir entre 1 et 100');
            return;

        }
                 
            let productObjet = {
                id:id,
                color: color.value,
                quantity:parseInt(quantity.value)
                //changer chaîne de caractère to number
            } 
            // Mise à disposition du localStorage si existant
            let productLocalStorage = JSON.parse(localStorage.getItem("users"));

            // Comportement si il n'y a pas de localStorage (il n'a ni valeur ni type défini : donc null)
            if (productLocalStorage == null) {
                productLocalStorage = [];
                productLocalStorage.push(productObjet);
                // .push action de pousser dans le tableau(panier)
            } else {
                // Comportement si il existe des données dans le localStorage

                // Condition si le produit comporte le même Id et la même couleur. Méthode find dans le localStorage et comparaison avec les valeurs de l'objet userProductArray

                let foundProduct = productLocalStorage.find(p => p.id == productObjet.id && p.color == productObjet.color);
                //cherche élément sur un tableau par rapport à une condition .find
                if (foundProduct != undefined){
                    foundProduct.quantity += productObjet.quantity ;
                    
                } else {
                    //productLocalStorage = 1 ;
                    productLocalStorage.push(productObjet);
                }
               
            }
            localStorage.setItem("users", JSON.stringify(productLocalStorage));
            alert("Le produit ajouté");
    });    
};





