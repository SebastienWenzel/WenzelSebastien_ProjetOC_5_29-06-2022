
// Mise à disposition des éléments à appeler pour la boucle d'affichage
let itemLocalStorage = JSON.parse(localStorage.getItem("users"));

// Appel de l'API pour rendre disponible la liste des articles
async function getArticle(){
        const productCart = document.getElementById("cart__items");

        let accPrice = 0;
        let totalPriceHtml = document.querySelector('#totalPrice');

        let accQuantity = 0;
        let totalQuantityHtml = document.querySelector('#totalQuantity');

        if (itemLocalStorage == null) {
            alert('Votre panier est vide');
            return;
        } else {
            for (i = 0; i < itemLocalStorage.length; i++) {
                    //récupère le produit correspondant à ID 
                    const catchArtcicle = await fetch("http://localhost:3000/api/products/"+ itemLocalStorage[i].id);
                    const getProduct = await catchArtcicle.json();         
                
                //Creation des éléments HTML
                const articleItem = document.createElement('article');
                
                const itemImage = document.createElement('div');
                const image = document.createElement('img');
        
                const itemContent = document.createElement('div');
                const contentDescription = document.createElement('div');
                let descriptionH2 = document.createElement('h2');
                let descriptionColor = document.createElement('p');
                let descriptionPrix = document.createElement('p');
        
                const itemContentSetting = document.createElement('div');
                
                const contentSettingQuantity = document.createElement('div');
                const quantity = document.createElement('p');
                const inputQuantity = document.createElement('input');
        
                const contentSettingRemove = document.createElement('div');
                const remove = document.createElement('p');
            
                //Ajout des classes sur chaque balise HTML
                articleItem.classList.add('cart__item');
                itemImage.classList.add('cart__item__img');
                itemContent.classList.add('cart__item__content');
                contentDescription.classList.add('cart__item__content__description');
                itemContentSetting.classList.add('cart__item__content__settings');
                contentSettingQuantity.classList.add('cart__item__content__settings__quantity');
                inputQuantity.classList.add('itemQuantity');
                contentSettingRemove.classList.add('cart__item__content__settings__delete');
                remove.classList.add('deleteItem');               
                
                // Noeuds
                productCart.append(articleItem);
                articleItem.append(itemImage,itemContent);
                itemImage.append(image);
                itemContent.append(contentDescription,itemContentSetting);
                contentDescription.append(descriptionH2,descriptionColor,descriptionPrix);
                itemContentSetting.append(contentSettingQuantity,contentSettingRemove);
                contentSettingQuantity.append(quantity,inputQuantity);
                contentSettingRemove.append(remove);
    
                //affichage des produits dans la page accueil
                articleItem.setAttribute("data-id", itemLocalStorage[i].id);
                articleItem.setAttribute("data-color", itemLocalStorage[i].color);

                image.alt = getProduct.altTxt;
                image.src = getProduct.imageUrl;

                descriptionH2.innerHTML = getProduct.name;
                descriptionColor.innerHTML = "Couleur : " + itemLocalStorage[i].color;
                descriptionPrix.innerHTML = "Prix : " + getProduct.price + "€";

                // inputQuantity.setAttribute("type", "number");
                // inputQuantity.setAttribute("name", "itemQuantity");
                // inputQuantity.setAttributesetAttribute("min", "1");
                // inputQuantity.setAttributesetAttribute("max", "100");
                // inputQuantity.setAttributesetAttribute("value", );
                quantity.innerHTML = "Qté : ";
                inputQuantity.type = "number";
                inputQuantity.name = "itemQuantity";
                inputQuantity.min = "1" ;
                inputQuantity.max = "100";
                inputQuantity.value = itemLocalStorage[i].quantity;
                                      
                remove.innerHTML = "Surprimer";
                
                //Calcul de la quantité total du panier
                accQuantity += itemLocalStorage[i].quantity;
                //Calcul du prix total sur les produits
                accPrice += (getProduct.price * itemLocalStorage[i].quantity)

            }
            //Quantité total du panier
            totalQuantityHtml.innerHTML = accQuantity;
            //Prix total du panier     
            totalPriceHtml.innerHTML = accPrice;  
        }
    changeQuantity();
    removeBtn();
};
function removeBtn(){
    let btnRemove = document.querySelectorAll(".deleteItem");
    someProduct = [] ;
    //Foreach méthode d'exécution une fonction donnée pour chaque élément du tableau
    btnRemove.forEach((basket)=> {
        basket.addEventListener("click",()=> {
            let totalProductRemove = itemLocalStorage.length;
            console.log(totalProductRemove);
            let article = basket.closest('article');
            console.log(article);

            //si 1 produit remove
            if(totalProductRemove == 1) {
                location.href = "cart.html";
                return localStorage.removeItem("users");     
            }
            else {
                //filtre les éléments même id ou même color 
                someProduct = itemLocalStorage.filter((element) => {
                    if (article.dataset.id != element.id || article.dataset.color != element.color){
                        return true;
                    }
                    
                });
                console.log(someProduct);
                //Confirmation pour suppression de l'élément
                if (window.confirm("Attention, ce produit va être supprimé du panier")){
                    localStorage.setItem("users", JSON.stringify(someProduct));
                    //rafraîchi la page
                    location.href = "cart.html";
                }   
            }
        });
    });   
};
function changeQuantity(){
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach((quantity) => {
        let article = quantity.closest('article');
        quantity.addEventListener("change", () =>{  
            //condition 0 || 100 logique négatif
            if(quantity.value < 1 || quantity.value > 100){
                alert('veuillez choisir entre 1 et 100');
                return;
            }
            const result = itemLocalStorage.find((el) => article.dataset.id === el.id && article.dataset.color === el.color)
            result.quantity = parseInt(quantity.value); 
            if (window.confirm("Attention, ce produit va être modifier du panier")){
                localStorage.setItem("users", JSON.stringify(itemLocalStorage));
            location.href = "cart.html";
            }
        });
    });
    
    
};
getArticle();

// Formulaire de Validation 
let form = document.querySelector('.cart__order__form');
let regExp = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
let regExpLocal = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{2,}$/;
var validFirstName = false;
var validLastName = false;
var validAddress = false;
var validCity = false;
var validMail = false;
//Ecouter la modification du Prénom
form.firstName.addEventListener('change', function(){
    validFirst(this);
});
const validFirst = function(inputFirst){ 
    let firstMsg = document.querySelector('#firstNameErrorMsg');
    
    if(regExp.test(inputFirst.value)){
        validFirstName = true;
        firstMsg.innerHTML = "";
    } else {
        firstMsg.innerHTML = "Veuillez renseigner correctement votre prénom (lettres et au moins 3 caractères)";
        validFirstName = false;
    }
};
//Ecouter la modification du Nom
form.lastName.addEventListener('change', function(){
    valideLast(this);
});
const valideLast = function(inputLast){
    let lastMsg =  document.querySelector('#lastNameErrorMsg');
    if(regExp.test(inputLast.value)){
        validLastName = true;
        lastMsg.innerHTML = "";
    } else {
        lastMsg.innerHTML = "Veuillez renseigner correctement votre nom (avec lettres et au moins 3 caractères)";
        validLastName = false;
    }
};
//Ecouter la modification de L'adresse
form.address.addEventListener('change', function(){
    validAdress(this);
});
const validAdress = function (inputAdress){
   let adressMsg = document.querySelector('#addressErrorMsg') 
   if(regExpLocal.test(inputAdress.value)){
    validAddress = true;
    adressMsg.innerHTML = "";
} else {
    adressMsg.innerHTML = "Veuillez renseigner une adresse postale valide";
    validAddress = false;
}
};
//Ecouter la modification du Ville
form.city.addEventListener('change', function(){
    valideCity(this);
});
const valideCity = function(inputCity){
    let cityMsg = document.querySelector('#cityErrorMsg');
    if(regExpLocal.test(inputCity.value)){
        validCity = true;
        cityMsg.innerHTML = "";
    } else {
        cityMsg.innerHTML = "Veuillez renseigner un nom de ville valide";
        validCity = false;
    }
};
//Ecouter la modification de l'email
form.email.addEventListener('change', function(){
    //this ce qui a été saisi
    validEmail(this);
});
const validEmail = function(inputEmail){
    //Création de l'expression régulière pour validation email
    let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    //Test de l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value);
    //Si respect bien le regexp = console.log(testEmail);
    let emailMsg = document.querySelector('#emailErrorMsg');
    if(testEmail === true){
        validMail = true;
        emailMsg.innerHTML = "";
    } else {
        emailMsg.innerHTML = "Veuillez renseigner une adresse email valide";
        //si remove après écriture risque de validation du formulaire 
        validMail = false;
    }
};
//Function pour formulaire Validé
function verifForm(){
    if (validFirstName &&
        validLastName &&
        validAddress &&
        validCity &&
        validMail){
            return true;
        } else {
            alert('Merci de renseigner correctement vos coordonnées pour passer la commande');
            return false;
        }
};

//bouton Submit
const formSubmit =  document.querySelector(".cart__order__form");
formSubmit.addEventListener('submit' , (event)=>{
    event.preventDefault();
    //Infos client stockage local pour confirmation
    const order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
      },
    // parcourir le tableau tout les id des produits 
    products: itemLocalStorage.map((el) => el.id)
    };
    if (verifForm()){
        //methode post
        const post = {
            method: 'POST',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(order),
        }
        console.log(post);
        console.log(order);
         //Appel à l'API "order" pour envoyer l'objet
        fetch("http://localhost:3000/api/products/order", post)
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            document.location.href = `confirmation.html?id=${data.orderId}`;
        })
        .catch((error) => {
            console.log(`ERREUR requete POST : ${error}`);
          });
    };
});



