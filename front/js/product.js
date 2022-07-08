const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
//Récupération du paramètre d'identification du produit choisi dans l'adresse du navigateur


fetch("http://localhost:3000/api/products/" + id)
// une reponse de la bonne réception du lien + ajout de identifiant du produit
.then ((response) => {
    return response.json(); 
    
})
// traduit en JSON : tableau contenant des objets
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
//console.log(product);
})
// On injecte les infos dans le HTML






//--Ajout du produit et ses infos au localstorage--//

const btnAdd = document.querySelector('#addToCart');
const color = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');


btnAdd.addEventListener('click', (e) => {
// Au clic, l'évènement s'effectue si les champs sont renseignés    

    // LocalStorage

    function saveProduct(lounge){
        localStorage.setItem("Users", JSON.stringify(lounge));
        //JSON.stringify transforme tableau objet en chaine de caractère        
    }
    //AJOUT PRODUUIT DANS LOCALTSTORAGE

    function getProduct(){
        let lounge =  localStorage.getItem("Users");  
        if (color.value !== "" && quantity != 0 && quantity < 100) {            
            let productObjet = {
                id:id,
                color: color.value,
                quantity:quantity.value
            } 
            // Création d'un objet produit
            return JSON.parse(lougne);
            //JSON.parse transforme chaine de caractère en tableau ou objet 
        }
        function addCart(productObjet) {
            let shoppingCart = getProduct();
            let foundProduct = lounge.find(p => p.id == productObjet.id);
            //cherche élément sur un tableau par rapport à une condition
            if (foundProduct != undefined){
                foundProduct.quantity++;
            } else {
                productObjet = 1;  
                productObjet.push(produc);
                // .push action de pousser dans le tableau(panier)
            }
            saveProduct(lounge);
        }
        } 
    //PRENDRE PRODUIT DANS LOCALSTORAGE

   
    //AJOUT PRODUIT DANS PANIER    

addCart();
});




